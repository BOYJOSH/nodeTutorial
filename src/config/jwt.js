import { config } from './env.js';
import jwt from 'jsonwebtoken';


export const aToken = (payload) => {
    try {
        
       return jwt.sign({payload}, config.asecret, {expiresIn: "5m"});

    } catch (error) {
        console.error(`Error signing acccess token. Error: ${error}`)
    }
}