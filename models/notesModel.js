const mongoose = require("mongoose")
const notesSchema = mongoose.Schema({
    title:{required:true, type:String},
    body:{required:true,type:String},
    date:{required:true,type:String},
    userID:{required:true,type:String}
})

notesSchema.virtual("timestamp").get(()=>{
    return this.date.getTime()
})

const NotesModel= mongoose.model("note",notesSchema)

module.exports = {NotesModel}