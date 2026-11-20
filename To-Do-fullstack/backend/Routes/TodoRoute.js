
import express from "express";

import {
  getTodos,
  createTodo,
} from "../Controller/TodoController.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);

export default router;
