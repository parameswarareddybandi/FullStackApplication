require("dotenv").config();

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.set('strictQuery', false);

var Name = "";
var Email = "";
var Phone = "";
var RollNo = "";

mongoose.connect(process.env.MONGO_URI, ()=> {
    app.listen(process.env.PORT, function () {
        console.log("Server Started.")
    })
})

app.get('/', function (req, res) {
 
    res.render("home", { yourName: Name, yourEmail: Email, yourPhone: Phone, yourRollNo: RollNo })
})

app.post('/', function (req, res) {

    Name = req.body.name;
    Email = req.body.email;
    Phone = req.body.phone;
    RollNo = req.body.rollno;

    const formSchema = mongoose.Schema({
        name : String,
        email : String,
        phone : String,
        rollno : String
    })
    
    const Form = mongoose.model("Form", formSchema)

    const formData = new Form({
        name : Name,
        email : Email,
        phone : Phone,
        rollno : RollNo
    })

    formData.save();

    res.redirect("/");

})
