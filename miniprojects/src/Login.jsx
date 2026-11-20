import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  alert('suceessful')

  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" p-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-700"
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=" p-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-700"
          required
        />

        <button
          type="submit"
          className=" bg-green-500  text-white font-bold p-3 rounded-lg"
        >
          Login
        </button>
        
      </form>
      
    </div>
  );
}

export default Login;
