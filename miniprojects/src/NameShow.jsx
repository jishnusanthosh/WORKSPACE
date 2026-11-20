


import { useState } from 'react';

function NameShow() {
  const [name, setName] = useState('');

  return (
    <div className="p-5">
      <h1>Show Name</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2"
      />

      <h2 className="text-green-500">
        {name}
      </h2>
    </div>
  );
}

export default NameShow;
