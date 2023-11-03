require("dotenv").config()
const jwt = require("jsonwebtoken")


const authMiddleware= async (req,res,next)=>{
    try {
        const token = req?.headers?.authorization?.split(" ")[1]
        console.log(token,"token")
        if(!token){
            return res.send(401).send({"error":"user is not verified"})
        }
        jwt.verify(token, process.env.SECRET, (err, decoded)=> {
            if(err){
                console.log(err)
                return res.status(500).send({"error":"internal server error"})
            }
            if(!decoded){
                return res.status(401).send({"error":"invalid token"})
            }
            if(decoded){
                req.body.userID= decoded.userID
                next()
            }
          });
          
    } catch (error) {
        console.log(error)
        res.status(500).send({"error":"internal server error"})
    }
}

module.exports={authMiddleware}