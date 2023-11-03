const express= require("express")
const { authMiddleware } = require("../middlewares/auth.middleware")
const { NotesModel } = require("../models/notesModel")
const notesRouter= express.Router()

notesRouter.post("/add",authMiddleware,async (req,res)=>{
    const {title,body,date,userID} = req.body
    try {
        const newNote = new NotesModel({title,body,date,userID})
        await newNote.save()
        res.send({"msg":"note added","note":newNote})

    } catch (error) {
        console.log(error)
        res.status(500).send({"error":"internal server error"})
    }
})

notesRouter.get("/",authMiddleware, async (req,res)=>{
    try {
        const pipeline = []

        const matchObject = {}
        matchObject.userID = req.body.userID
        pipeline.push({$match:matchObject},{$sort:{date: -1,  timestamp: -1 }})
        const notes = await NotesModel.aggregate(pipeline)
        res.send(notes)

    } catch (error) {
        console.log(error)
        res.status(500).send({"error":"internal server error"})
    }
})


module.exports = {notesRouter}