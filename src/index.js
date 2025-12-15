import express from 'express';

import { config } from './config/env.js';

import {routes} from './utils/routes.js';

import { initDB } from './models/index.js';

const app = express();

app.use(express.json());
app.use(routes);


// router.get('/api/users', (req, res) => {
//     const {miles} = req.query;

//     if (miles){
//         const user = users.find((item) => item.id == parseInt(miles));

//         return res.status(200).json({user})
//     }
//     return res.status(200).json(users);
// })

//Post Function

// router.get("/products", auth,(req, res) => {
//   try {

//     return res.status(200).json({products});

//   } catch (error) {
//     console.error(`Error getting products`);
//       return res.status({message: "Internal Server Error!"})
//   }
// })

// router.delete("/product/:id", auth, (req, res) => {
//   try {

//     const loggedInUser = req.user;

//     if(!loggedInUser) return res.status(401).json({error: `Kindly login to access this endpoint`});

//     if(loggedInUser.payload.role !== "admin") return res.status(403).json({error: `Unauthorized! You don't have permission to accces this endpoint.`});

//     const {id} = req.params;

//     if(!id) return res.status(400).json({error: `ID is required`});

//     const product = products.find((product) => product.id === parseInt(id));

//     if(!product) return res.status(404).json(`{error: Product not found with id: ${id}}`);

//     const productsLeft = products.filter((product) => product.id !== parseInt(id));

//     return res.status(200).json({productsLeft});

//   } catch (error) {

//     console.error(`Error deleting products. Error: ${error}`);

//     return res.status(500).json({error: `Internal Server Error.`});

//   }
// });

app.listen(config.port, async () => {
  try {
    console.log(`server running on http://localhost:${config.port}`);
    await initDB();
    console.log('Connection has been established successfully.');
  }
  catch (error) {
    console.error('Unable to connect to the database:', error);
  }

})
