import { bankAccount } from "../models/bankAccount.js";
import Transaction from "../models/transaction.js";
import { convertCurrency } from "../utils/currency.js";
import { generateAccountNumber } from "../utils/helpers.js";

export const transferController = async (req, res) => {
  try {
    let { from, to, amount } = req.body;

    if (!from || !to || !amount) 
      return res.status(400).json({ error: `"from", "to" or "amount" is required` });

    if (typeof amount === 'string' || amount < 10) 
      return res.status(400).json({ error: `Invalid amount` });

    const tFrom = await bankAccount.findOne({ where: { accountNumber: from } });
    const tTo = await bankAccount.findOne({ where: { accountNumber: to } });

    if (!tFrom) return res.status(400).json({ error: "Sender account not found" });
    if (!tTo) return res.status(400).json({ error: "Receiver account not found" });

    if (req.user.payload.Id !== tFrom.userId)
      return res.status(403).json({ error: "Unauthorized to perform this transaction" });

    if (parseFloat(tFrom.balance) < amount)
      return res.status(400).json({ error: "Insufficient funds" });

    // Convert currency if needed
    if (tFrom.currency !== tTo.currency) {
      amount = await convertCurrency(tFrom.currency, tTo.currency, amount);
    }

    const senderNewBalance = parseFloat(tFrom.balance) - parseFloat(amount);
    const receiverNewBalance = parseFloat(tTo.balance) + parseFloat(amount);

    // Update balances
    await Promise.all([
      tFrom.update({ balance: senderNewBalance }),
      tTo.update({ balance: receiverNewBalance }),
    ]);

    // Create transaction
    const transaction = await Transaction.create({
      transactionType: "transfer",
      senderAccount: tFrom.accountID,
      recieverAccount: tTo.accountID,
      senderId: tFrom.userId,
      recieverId: tTo.userId,
      amount,
      status: "successful"
    });

    return res.status(200).json({
      message: `Transfer of ${amount} from ${from} to ${to} successful`,
      transaction
    });

  } catch (error) {
    console.error("Transfer Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



export const createBankAccountController = async (req, res) => {
  try {
    const loggedInUser = req.user;

    if (!loggedInUser)
      return res.status(401).json({ error: "Kindly login to access this endpoint" });

    const { accountType, bankName, currency } = req.body;

    if (!accountType || !bankName || !currency)
      return res.status(400).json({
        error: "accountType, bankName and currency are required"
      });

    if (!["USD", "NGN", "EUR"].includes(currency))
      return res.status(400).json({
        error: "currency must be one of USD, NGN, EUR"
      });

    // OPTIONAL: prevent duplicate currency account for same user
    const existingAccount = await bankAccount.findOne({
      where: {
        userId: loggedInUser.id,
        currency
      }
    });

    if (existingAccount)
      return res.status(400).json({
        error: `You already have a ${currency} account`
      });

    const accountNumber = generateAccountNumber();

    const account = await bankAccount.create({
      userId: loggedInUser.id,
      accountType,
      bankName,
      currency,
      accountNumber
    });

    return res.status(201).json({
      success: "Account created successfully",
      account
    });

  } catch (error) {
    console.error("Create Account Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
