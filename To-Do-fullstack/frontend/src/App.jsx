
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  const API = "http://localhost:5000/api/todos";


  // GET - Fetch all todos
  const getTodos = async () => {
    try {
      const res = await axios.get(API);
      setTodos(res.data);
    } catch (error) {
      console.error(
        "Error fetching todos:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  // POST - Create a new todo
  const addTodo = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      await axios.post(API, {
        title: title.trim(),
      });

      setTitle("");
      await getTodos();
    } catch (error) {
      console.error(
        "Error adding todo:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div>
      <h2>My Todo</h2>

      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Enter the task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button type="submit">Add Todo</button>
      </form>

      <h2>Todo List</h2>

      {todos.map((todo) => (
        <div key={todo._id}>
          <p>{todo.title}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
