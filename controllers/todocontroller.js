// inside the controller we add the logic

const Todo=require("../models/Todo")

exports.addTodo=async (req,res)=>{
    try{
        const todo=new Todo({
            task:req.body.task,

        })
        const saveTodo=await todo.save();
        res.status(201).json(saveTodo)
        console.log("at least it reached this point")
    }catch(error){
        res.status(500).json({error:"failed to add todo"})
    }
}
exports.viewall=async(req,res)=>{
    try{
        const todos=await Todo.find()
        res.status(200).json(todos)
        
    }catch(error){
        console.error("error while fetching todos",error)
        res.status(500).json({error:"failed to retrieve tasks"})

    }
}
exports.markAsCompleted=async(req,res)=>{
    try{
        // first of all i need the id of the thing
        const {id}=req.params;
        const{completed}= req.body;

        const updateTodo= await Todo.findByIdAndUpdate(
            id,{completed},{new:true}
        );
        if(!updateTodo){
            return res.status(404).json({error :"task not found"})
        }
        res.status(200).json(updateTodo)

    }catch(error){
        console.error("error updating task",error)
        res.status(500).json({error:"failed to update task"})

    }
}
exports.getCompletedTasks=async(req,res)=>{
    try{
        const completedTasks= await Todo.find({completed:true})
        res.status(200).json(completedTasks)

    }catch(error){
        console.error("error while fetchin completed tasks")
        res.status(500).json({error :"failed to retrieve completed tasks"})

    }
}
exports.getUncompletedTasks=async(req,res)=>{
    try{
        const uncompletedTasks= await Todo.find({
            completed:false
        })
        res.status(200).json(uncompletedTasks)
    }catch(error){
        console.error("error fetching uncompleted tasks")
        res.status(500).json ({error :" failed to retrieve uncompleted tasks"})
    }
}
exports.deleteTodo=async(req,res)=>{
    try {
        const {id}=req.params;
        const deletedTodo= await Todo.findByIdAndDelete(id)

        if(!deletedTodo){
            return res.status(404).json({error:"task not found"})
        }
        res.status(200).json({message:"task deleted succesfully"})
        
    } catch (error) {
        console.error("error deleting task",error);
        res.status(500).json({error:"falied to delete"})
    }

}