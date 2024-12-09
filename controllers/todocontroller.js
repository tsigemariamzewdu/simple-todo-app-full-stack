// inside the controller we add the logic

const Todo=require("../models/Todo")

exports.addTodo=async (req,res)=>{
    try{
        const todo=new Todo({
            task:req.body.task,
            user:req.user.id,

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
        const todos=await Todo.find({user:req.user.id}).populate("user", "name")
        res.status(200).json(todos)
        
    }catch(error){
        console.error("error while fetching todos",error)
        res.status(500).json({error:"failed to retrieve tasks"})

    }
}
exports.markAsCompleted = async (req, res) => {
    try {
        const { id } = req.params;

        const updateTodo = await Todo.findOneAndUpdate(
            { _id: id, user: req.user.id }, // Ensure both _id and user match
            { completed: true },           // Update completed status
            { new: true }                  // Return the updated document
        );

        if (!updateTodo) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json(updateTodo);
    } catch (error) {
        console.error("Error updating task", error);
        res.status(500).json({ error: "Failed to update task" });
    }
};

exports.getCompletedTasks=async(req,res)=>{
    try{
        const completedTasks= await Todo.find({user:req.user.id,completed:true})
        res.status(200).json(completedTasks)

    }catch(error){
        console.error("error while fetchin completed tasks")
        res.status(500).json({error :"failed to retrieve completed tasks"})

    }
}
exports.getUncompletedTasks=async(req,res)=>{
    try{
        const uncompletedTasks= await Todo.find({user:req.user.id,
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
        const deletedTodo= await Todo.findByIdAndDelete({ _id: id, user: req.user.id })

        if(!deletedTodo){
            return res.status(404).json({error:"task not found"})
        }
        res.status(200).json({message:"task deleted succesfully"})
        
    } catch (error) {
        console.error("error deleting task",error);
        res.status(500).json({error:"falied to delete"})
    }

}