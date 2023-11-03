
const bcrypt=require("bcrypt")

const { UserModel } = require("../models/userModel")

const loginMiddleware = async (req,res,next)=>{

    const {email,password} = req.body
    if(!email || ! password){
        return res.status(400).send({"error":"email or password missing"})
    }
    
    try {
        const isUser= await UserModel.findOne({email})
        if(!isUser){
            return res.status(401).send({"error":"email not registered. Please register"})
        }
        bcrypt.compare(password, isUser.password, (err, result)=> {
            if(err){
               return res.status(500).send({"error":"internal server error"})
            }
            if(!result){
                return res.status(401).send({"error":"invalid credentials"})
            }
            if(result){
                req.body.userID = isUser.id
                next()
            }
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({"error":"internal server error"})
    }
    
}

module.exports = {loginMiddleware}