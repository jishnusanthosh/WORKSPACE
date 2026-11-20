
import Todo from "../models/Todo.js";

// GET
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST
export const createTodo = async (req, res) => {
  try {
    console.log(req.body);
    
    const todo = await Todo.create({
      title: req.body.title,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
