import { aToken } from "../config/jwt.js";
import { users } from "./users.service.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { loginUserSchema } from "../../validators/users.js";
import { Router } from "express";
import { User } from "../models/user.js";

export const signUpUserController = async (req, res) => {
  try {
    //destructuring data from frontend
    let { firstName, lastName, email, password } = req.body;

    //Validating USer input

    if (!firstName) return res.status(400).json({ error: `firstName is required` })
    if (!lastName) return res.status(400).json({ error: `lastName is required` })
    if (!email) return res.status(400).json({ error: `email is required` })
    if (!password) return res.status(400).json({ error: `password is required` })

    //checek if a user exist
    let valid = await User.findOne({where: {email: email}})

    
    //throw an error is user exist
    if (valid) return res.status(400).json({ error: `user exist with email: ${email}`, })

    const encryptedPassword = await hashPassword(password)
    console.log(encryptedPassword)
    const newuser = {
      firstName,
      lastName,
      email,
      encryptedPassword
    }
    valid = users.push(newuser)

    return res.status(201).json({ message: `Account registered successfully`, newuser: users[users.length - 1] });
  }
  catch (error) {
    console.error("Error signing up user", error)

    return res.status(500).json({ error: `Internal Server Error` })
  }
};


export const loginUserController = async (req, res) => {

  try {
    const { error, value } = loginUserSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const { email, password } = value
    let exist = users.find((users) => users.email === email);
    const Id = exist.id;
    const role = exist.role;

    const accessToken = aToken({ Id, role })
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
    return res.status({ message: "Internal Server Error!" })

  }

  return res.status(400).json({ message: `User not found` })
  //res.json({users})
}
export const getUserProfileController = async (req, res) => {
  try {

    const loggedIn = req.user;

    if (!loggedIn) return res.status(401).json({ error: `Unauthorized!` });

    const id = loggedIn.id;

    const user = users.find((user) => user.id === parseInt(id));
    if (!user) return res.status(404).json({ error: `user not found with id: ${id}` })

    return res.status(200).json({ user });

  } catch (error) {

  }
};