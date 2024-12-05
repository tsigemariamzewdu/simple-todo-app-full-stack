const express=require("express");
const router=express.Router();
const todoController=require("../controllers/todocontroller")


// routes for Todos

// the first one is to add a new list 
router.post("/add",todoController.addTodo)
// the second one is to fetch all the todos from the database that has been inserted so far
router.get("/viewall",todoController.viewall)
// the last route is gonna be to update the todo whether it is completed or not
router.patch("/:id/complete", todoController.markAsCompleted)

// i decided to add two more routes so that user can see which tasks are completed so far and which sre not
router.get("/completed",todoController.getCompletedTasks);
router.get("/uncompleted",todoController.getUncompletedTasks)
//and one more route to delete the task
// routes/todoRoutes.js
router.delete("/:id/delete", todoController.deleteTodo);


module.exports=router