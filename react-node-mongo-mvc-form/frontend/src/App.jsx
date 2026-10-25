import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(API_URL, {
        name: name.trim(),
        age: Number(age),
      });

      setMessage(response.data.message);
      setName("");
      setAge("");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Could not save user. Check that the backend and MongoDB are running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <section className="form-card">
        <h1>User Form</h1>
        <p className="subtitle">Enter a name and age to save to MongoDB.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            min="1"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Submit"}
          </button>
        </form>

        {message && <p className="message" role="status">{message}</p>}
      </section>
    </main>
  );
}

export default App;
