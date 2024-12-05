// inside a  model we will define the schema 
const mongoose =require("mongoose");

const todoSchema= new mongoose.Schema({
    task:{
        type:String, required:true
    },
    completed:{type:Boolean,default:false}
})

module.exports=mongoose.model("Todo",todoSchema);