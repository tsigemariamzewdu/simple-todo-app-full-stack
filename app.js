const express=require("express");
const mongoose=require("mongoose")
const cors= require("cors")

const todoRoutes=require("./routes/todoRoutes");
const userRoutes=require("./routes/userRoutes")

const app=express()
const PORT=3000;

//cors middleware
app.use(cors())

//middleware

app.use(express.json())


//mongoose connection
mongoose.connect("mongodb://localhost:27017/mvcexample",{
   
   
}

).then(()=>
console.log("mongoDB connected"))
.catch((error)=>{
    console.error("mongodb connection failed")
})


app.use('/api/todos',todoRoutes)
app.use('/api/user',userRoutes)
//now let's start the server

app.listen(PORT,()=>{
    console.log('server running')
})
