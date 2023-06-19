require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set('strictQuery', false);

var Name = "";
var Email = "";
var Phone = "";
var RollNo = "";

// Define the formSchema outside the route handler
const formSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  rollno: String
});

// Compile the Form model using the formSchema
const Form = mongoose.model("Form", formSchema);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.get('/', function (req, res) {
  res.render("home", { yourName: Name, yourEmail: Email, yourPhone: Phone, yourRollNo: RollNo });
});

app.post('/', function (req, res) {
  Name = req.body.name;
  Email = req.body.email;
  Phone = req.body.phone;
  RollNo = req.body.rollno;

  const formData = new Form({
    name: Name,
    email: Email,
    phone: Phone,
    rollno: RollNo
  });

  formData.save();

  res.redirect("/");
});

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("listening for requests");
  });
});
