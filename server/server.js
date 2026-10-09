const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./models/Student");
require("dotenv").config()


const app = express();


app.use(cors());
app.use(express.json());
mongoose
.connect(process.env.MONGO_URI)
.then(() =>{
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.log("MongoDB connection error", error);
});


app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/students", async (req, res) => {
  const students = await Student.find();

  res.json(students);
});

app.post("/students", async (req, res) => {
  const { name, course, age } = req.body;

  const student = new Student({
    name,
    course,
    age
  });

  await student.save();

  res.json(student);
});


app.put("/students/:id", async (req, res) => {
  const { name, course, age } = req.body;

  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.id,
    {
      name,
      course,
      age
    },
    { new: true }
  );

  res.json(updatedStudent);
});


app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);

  res.json({ message: "Student deleted successfully" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

