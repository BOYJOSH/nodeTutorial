import { aToken } from "../config/jwt.js";
import { users } from "./users.service.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { loginUserSchema, transferSchema, sigupUserSchema} from "../../validators/users.js";
import { Router } from "express";
import { User } from "../models/user.js";
import { generateAccountNumberFromPhoneNumber, generateStateSecurityNumber } from "../utils/helpers.js";
import { bankAccount } from "../models/bankAccount.js";


export const signUpUserController = async (req, res) => {
  try {
    //destructuring data from frontend and Validating User input
    const { error, value } = sigupUserSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    let { firstName, lastName, email, password, phoneNumber, balance } = value;

    const [valid, existingPhone] = await Promise.all([
      User.findOne({ where: { email } }),
      User.findOne({ where: { phoneNumber } })
    ]);

    if (valid) {
      return res.status(400).json({ error: `User already exists with email: ${email}` });
    }

    if (existingPhone) {
      return res.status(400).json({ error: `An account already exists with this phone number` });
    }
    
    const accountNumber = generateAccountNumberFromPhoneNumber(phoneNumber);
    const encryptedPassword = await hashPassword(password)
    /*console.log(encryptedPassword)*/

    const newUser = await User.create({
       ...req.body, 
       password: encryptedPassword, 
       SSN: generateStateSecurityNumber() 
      });
    const account = await bankAccount.create({
      userId: newUser.id,
      bankName: "Access Bank",
      balance: balance,
      accountNumber: accountNumber,
    });
    return res.status(201).json({
      message: `User registered successfulyy`,
      user: newUser,
      accountDetails: account
  });
}
  catch (error) {
  console.error("Error signing up user", error)

  return res.status(500).json({ error: `Internal Server Error` })
}
};

export const transferController = async (req, res) => {
  try {
    const {error, value}= transferSchema.validate(req.body, {abortEarly: false});
    if (error) {
      return res.status(400).json({ error: error.message });
    } 
    let { fromAccount, toAccount, amount } = value;

    const senderAccount = await bankAccount.findOne({ where: { accountNumber: fromAccount } });
    const receiverAccount = await bankAccount.findOne({ where: { accountNumber: toAccount } });
    if (!senderAccount) return res.status(404).json({ error: `Sender account not found: ${fromAccount}` });
    if (!receiverAccount) return res.status(404).json({ error: `Receiver account not found: ${toAccount}` });
    senderAccount.balance -= amount;
    receiverAccount.balance += amount;
    await senderAccount.update({ balance: senderAccount.balance });
    await receiverAccount.update({ balance: receiverAccount.balance });
    

   return res.status(200).json({
      message: "Transfer successful",
      transaction:{ 
        from: senderAccount.accountNumber,
        to: receiverAccount.accountNumber,
        amount
      }
    });
  } catch (error) {
    console.error("Error processing transfer", error);
    return res.status(500).json({ error: 'Internal Server Error Trying to make transfer' });
  }
};

export const loginUserController = async (req, res) => {

  try {
    const { error, value } = loginUserSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const { email, password } = value
    let exist = await User.findOne({where: {email}})
    const Id = exist.id;
    const role = exist.role;

    const accessToken = await aToken({ Id, role })
    if (exist) {
      if (exist.password === password) {
        return res.status(200).json({ message: "Login successfully", accessToken })
      }
      else {
        return res.status(400).json({ message: `Incorrect Password` })
      }
    };
  } catch (error) {
    console.error(`Error logging in user`);
    return res.status({ message: "Internal Server Error Trying to Login!" })

  }

  return res.status(400).json({ message: `User not found` })
  //res.json({users})
};
export const getUserProfileController = async (req, res) => {
  try {

    const loggedIn = req.User;

    if (!loggedIn) return res.status(401).json({ error: `Unauthorized!` });

    const id = loggedIn.id;

    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ error: `user not found with id: ${id}` })

    return res.status(200).json({ user });

  } catch (error) {
     console.error(`Error getting user`);
    return res.status({ message: "Internal Server Error Trying to Get User!" })
  }
};