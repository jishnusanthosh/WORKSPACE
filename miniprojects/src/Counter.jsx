import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center ">
      <div className="flex justify-center gap-3 ">
        <button
          onClick={increment}
          className="
            bg-white rounded-lg  px-5 py-3" 
        >
          increment
        </button>
        <p className="text-6xl font-bold text-green-400">{count}</p>
        <button onClick={decrement} className="bg-white rounded-lg py-3 px-5">
          decrement
        </button>
      </div>
    </div>
  );
}

export default Counter;
