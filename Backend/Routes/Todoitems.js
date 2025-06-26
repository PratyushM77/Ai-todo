const express = require("express");
const TodoSchema = require("../model/Todomodel");
const router = express.Router();
const AuthenticateUser = require("../Auth/Userauth");

router.post("/posttodo", AuthenticateUser, async (req, res) => {
  const { todo } = req.body;
 if (!todo) return res.status(400).json({ message: "Todo is required" });
  try {
    const createTodo = await TodoSchema.create({
      todo,
      user: req.user.id 
    });

    // await createTodo.save()
    res
      .status(201)
      .json({ message: "Response Posted in Todo List", createTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/gettodo",AuthenticateUser, async (req, res) => {
  try {
    const todoData = await TodoSchema.find({user:req.user.id});
    res.status(200).json({ todoData });
  } catch (error) {
    console.error(error);
  }
});

router.get("/todo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await TodoSchema.findById(id);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Can't get it right now" });
  }
});

router.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await TodoSchema.findByIdAndDelete({ _id: id });
    res.status(200).json(singleUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to Delete" });
  }
});

router.patch("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;
  try {
    const singleUpdate = await TodoSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(singleUpdate);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
