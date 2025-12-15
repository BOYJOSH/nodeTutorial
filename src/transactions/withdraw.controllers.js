import { bankAccount } from "../models/bankAccount.js";
import Transaction from "../models/transaction.js";

export const withdrawController = async (req, res) =>{
    try {
        const {sender, amount} = req.body;
        const tFrom = await bankAccount.findOne({
            where: {accountNumber: sender},
            attributes: ["balance", "userId"]
        });
        if(!tFrom) return res.status(400).json({Error: "The senders account number is invalid"})
        const transaction = await Transaction.create({
                transactionType: "withdrawal",
                senderAccount: sender,
                senderId: tFrom.toJSON().userId,
                amount: parseFloat(amount),
                status: "pending"
        });
        if (tFrom.toJSON().balance < amount){
            await Transaction.update(
                {status: "failed"},
                {where: {transaction_id: transaction.transaction_id}}
            )
            return res.status(400).json({Error: 'Insufficient Balance'})
        }
        const balance = parseFloat(tFrom.toJSON().balance)
        const newBalance = balance - parseFloat(amount)
        Promise.all(
            await bankAccount.update(
                {balance: newBalance},
                {where: {accountNumber: sender}}
            ),
            await Transaction.update(
                {status: "successful"},
                {where: {transaction_id: transaction.transaction_id}}
            )
        )
        return res.status(200).json({Success: `Withdrawal of ${amount} from ${sender}'s account was succesful`})
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Internal Server Error'})
    }
};