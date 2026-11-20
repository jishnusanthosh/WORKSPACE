import { useState } from 'react';

function Search() {

  const students = ["Jishnu", "Arun", "Rahul", "Akhil", "Amal"];

  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) =>
    student.toLowerCase().includes(search)
  );

  return (
    <div>
      <h2>Search Students</h2>

      <input
        type="text"
        placeholder="Type here to search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredStudents.map((student, index) => (
        <p key={index}>{student}</p>
      ))}

    </div>
  );
}

export default Search;