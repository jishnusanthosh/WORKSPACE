function Students() {
  const students = ["Jishnu", "Arun", "Rahul", "Akhil", "Amal"];

  return (
    <div>
      <h1>Students List</h1>
      {students.map((s, index) => (
        <p key={index}>{s}</p>
      ))}
    </div>
  );
}

export default Students;
