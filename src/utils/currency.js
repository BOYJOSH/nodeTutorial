import axios from "axios";
import { config } from "../config/env.js";

export const convertCurrency = async (from, to, amount) => {
    try {

        const url = `https://api.apilayer.com/currency_data/convert?from=${from}&to=${to}&amount=${amount}`;

        const response = await axios.get(url, {
            headers: { apikey:config.apiKey },
        });

    return response.data.result;

    
        
    } catch (error) {

        console.error(`Error converting currency. Error: ${error}`);
        
        return res.status(500).json({error: `Internal Server Error.`});
        
    }
};