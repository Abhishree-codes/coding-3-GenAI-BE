const express = require("express")
const { UserModel } = require("../models/userModel")
const bcrypt = require("bcrypt")
const { loginMiddleware } = require("../middlewares/login.middleware")
require("dotenv").config()
const jwt = require("jsonwebtoken")

const userRouter= express.Router()

userRouter.post("/register", async (req,res)=>{
    const {email,password} = req.body
    try {
        if(!email ||!password){
            res.send({"error":"email or password is missing"})
        }else{
            const isEmail= await UserModel.findOne({"email":email})
            if(isEmail){
                res.status(400).send({"error":"email already exists"})
            }else{
                bcrypt.hash(password, 5, async (err, hash)=> {
                    try {
                        if(err){
                            res.status(500).send({"error":"internal server error"})
                        }else{
                            const userToAdd= new UserModel({email,password:hash})
                            await userToAdd.save()
                            res.send({"msg":"user added!"})
                        }  
                    } catch (error) {
                        console.log(error)
                        res.status(500).send({"error":"internal server error"})
                    }
                });
                
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({"error":"internal server error"})
    }
})


userRouter.post("/login",loginMiddleware, async (req,res)=>{

  try {
    const token= jwt.sign({
        userID: req.body.userID
      }, process.env.SECRET, { expiresIn: '24h' });
      
      res.send({"token":token})

  } catch (error) {
    console.log(error)
    res.status(500).send({"error":"internal server error"})
  }
})


module.exports={userRouter}
