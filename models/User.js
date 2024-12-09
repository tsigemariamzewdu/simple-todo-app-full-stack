const mongoose= require("mongoose");
const bcrypt =require("bcryptjs")

const UserSchema= new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true , unique:true},
    password:{type:String, required:true}

});

// there is a way to hash the password before saving
UserSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
})

module.exports=mongoose.model("User",UserSchema)