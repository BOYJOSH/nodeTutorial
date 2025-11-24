import express from 'express';
import { Router } from 'express';
import { config } from './config/env.js';
import hashPassword from './utils/bcrypt.js';


const users = [
  {
    id: 1,
    name: "johndoe",
    password: "password123",
    email: "joshua@gmail.com",
    isAdmin: true,
    createdAt: "2024-01-02"
  },
  {
    id: 2,
    name: "marysmith",
    password: "maryPass55",
    email: "johndoe@gmail.com",
    isAdmin: false,
    createdAt: "2024-02-10"
  },
  {
    id: 3,
    name: "peterj",
    password: "peter2024",
    email: "peterj@gmail.com",
    isAdmin: false,
    createdAt: "2024-03-05"
  },
  {
    id: 4,
    name: "peterj",
    password: "david2025",
    email: "davidmark@gmail.com",
    isAdmin: false,
    createdAt: "2024-03-05"
  }
];


const app = express();

app.use(express.json());

const router = Router();
app.use(router);
router.get("/", (req, res) => {
    res.send(`Hello World`)
})

router.get('/api/users', (req, res) => {
    const {miles} = req.query;
    
    if (miles){
        const user = users.find((item) => item.id == parseInt(miles));

        return res.status(200).json({user})
    }
    return res.status(200).json(users);
})

//Post Function
router.post('/users/signup', async (req, res) => {

  //destructuring data from frontend
  const {id, name, email, password} = req.body;
  
  //Validating USer input
  if(!id) return res.status(400).json({error: `id is required`})
  if(!name) return res.status(400).json({error: `name is required`})
  if(!email) return res.status(400).json({error: `email is required`})
  if(!password) return res.status(400).json({error: `password is required`})
  
  //checek if a user exist
  let valid = users.find((item) => item.email === email);

  //throw an error is user exist
  if(valid) return res.status(400).json({error: `user exist with email: ${email}`,})
  
  const encryptedPassword = await hashPassword(password)
  console.log(encryptedPassword)
  const newuser={
    id,
    name,
    email,
    encryptedPassword
  }
  valid = users.push(newuser)
  
  return res.status(201).json({message: `Account registered successfully`, newuser: users[users.length -1]});

})
router.post("/users/login", (req, res) =>{
    const {email, password} = req.body;
    const exist = users.find((users) => users.email === email);
    if(exist){
        if(exist.password === password){
            return res.status(200).json({message: "Login successfully"})
        }
        else{
            return res.status(400).json({message: `Incorrect Password`})
        }
    };
    return res.status(400).json({message: `User not found`})
    //res.json({users})

})

app.listen(config.port, () => {
    console.log(`server running on http://localhost:${config.port}`);
        
})
