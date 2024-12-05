const express=require("express");
const mongoose=require("mongoose")

const todoRoutes=require("./routes/todoRoutes");

const app=express()
const PORT=3000;

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
//now let's start the server

app.listen(PORT,()=>{
    console.log('server running')
})
