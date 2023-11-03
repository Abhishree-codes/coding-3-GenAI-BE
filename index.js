const express = require("express")
const app = express()
const cors = require("cors")
const { connection } = require("./db")
const { userRouter } = require("./routes/userRouter")
const { notesRouter } = require("./routes/notesRouter")

app.use(cors())
app.use(express.json())
app.use("/users",userRouter)
app.use("/notes",notesRouter)



app.get("/",(req,res)=>{
    res.send("notes application :)")
})



app.listen(8080,async ()=>{
    try {
        await connection

        console.log("server is running")  
    } catch (error) {
        console.log(error)
    }

})