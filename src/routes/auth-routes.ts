import express from "express"
import jwt from "jsonwebtoken"
import "dotenv/config"
import AuthMiddleware from "../middlewares/AuthMiddleware"
import bcrypt from 'bcrypt'
import { UserQuery } from "../utils/query_handler"
import { PayloadUserInterface } from "../types/PayloadTypes"

interface UserInterface { 
    username : string;
}

const router = express.Router()
let refreshTokens : string[] = [];


router.post('/token' , (req , res) => {
    const refreshToken = req.body.token;
    
    if(refreshToken === null) return res.sendStatus(401);
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(401);

    jwt.verify(refreshToken,process.env.REFRESH_ACCESS_TOKEN as string,(err, user ) => {
     
        if(err) return res.sendStatus(401);
        
        const accessToken = generateToken(user)

        return res.json({
            access: accessToken 
        })
    });
})

router.post('/login', async (req, res) => {
    const { username , password } = req.body;
    
    const userInfo : PayloadUserInterface | null = await UserQuery.findFirst(username);

    if(!userInfo) return res.status(401).json({message: 'Invalid username'});

    if(!await bcrypt.compare(password,userInfo.password)){
        return res.status(401).json({ message : "Invalid Credentials"})
    }


    const accessToken = generateToken(userInfo)
    const refreshToken = generateRefreshToken(userInfo);
    refreshTokens.push(refreshToken)
    return res.json({
        user: userInfo,
        access : accessToken,
        refresh : refreshToken
    })
})

router.post("/register" , async (req,res) => {
    try {
        const { first_name , last_name , username , age  , email, password } = req.body;
        const salt = await bcrypt.genSalt(10)
        const response = await UserQuery.create({
            first_name:first_name,
            last_name: last_name,
            username:username,
            age:age,
            password: await bcrypt.hash(password,salt),
            email:email,
            role:"ADMIN"
          })
          res.json({
            username : username,
            password : password
          });
          
      } catch (error) {
        console.log(error);
        
          res.status(500).json({msg : error})
      }
      
})


function generateToken(user : PayloadUserInterface){
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET as string);
}
function generateRefreshToken(user: PayloadUserInterface){
    return jwt.sign(user,process.env.REFRESH_ACCESS_TOKEN as string);
}
export  default router;
