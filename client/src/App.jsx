import { useEffect, useState } from "react";
import axios from "axios";

function App() {


  const [students, setStudents] = useState([]);
  

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null);
  useEffect(() => { 

    axios
    .get("http://localhost:5000/students")
    .then((response) => {
      setStudents(response.data);
    });
  }, []); 


const addStudent = () => {
  axios
    .post("http://localhost:5000/students", {
      name,
      course,
      age: Number(age)
    })
    .then((response) => {
      setStudents([...students, response.data]);

      setName("");
      setCourse("");
      setAge("");
    });
};


const editStudent = (student) => {
  setName(student.name);
  setCourse(student.course);
  setAge(student.age);
  setEditingId(student._id);
};

const updateStudent = () => {
  axios
    .put(`http://localhost:5000/students/${editingId}`, {
      name,
      course,
      age: Number(age)
    })
    .then((response) => {
      setStudents(
        students.map((student) =>
          student._id === editingId ? response.data : student
        )
      );

      setName("");
      setCourse("");
      setAge("");
      setEditingId(null);
    });
};


const deleteStudent = (id) => {
  axios
    .delete(`http://localhost:5000/students/${id}`)
    .then(() => {
      setStudents(
        students.filter((student) => student._id !== id)
      );
    });
};

  return (
    <div>
      <h1>Student Management System</h1>


      <h2>Add Student</h2>

<input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
<br />

<input type="text" placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)}/>
<br />

<input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)}/>
<br />

<button onClick={editingId ? updateStudent : addStudent}>
  {editingId ? "Update Student" : "Add Student"}
</button>

<h2>Students</h2>

 {students.map((student) => (
  <div key={student._id}>
    <p>Name: {student.name}</p>
    <p>Course: {student.course}</p>
    <p>Age: {student.age}</p>

    <button onClick={() => editStudent(student)}>Edit</button>
    <button onClick={() => deleteStudent(student._id)}>Delete</button>
  </div>
))}
    </div>

  );
}

export default App;