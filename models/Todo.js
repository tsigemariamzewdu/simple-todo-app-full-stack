// inside a  model we will define the schema 
const mongoose =require("mongoose");

const todoSchema= new mongoose.Schema({
    task:{
        type:String, required:true
    },
    completed:{type:Boolean,default:false},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
})

module.exports=mongoose.model("Todo",todoSchema);