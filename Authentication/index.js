const { name } = require("ejs");
const express = require("express");
const mongoose = require("mongoose");


const app = express();

app.use(express.json());// this is not used to parse html form data only applicable for json

mongoose.connect("mongodb://127.0.0.1:27017/",{
    dbName : "backend",
}).then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
})

// mongodb://localhost:27017

const messageSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
})

const Message = mongoose.model("Message", messageSchema);

// Add this middleware to parse form data
app.use(express.urlencoded({ extended: true }));

const users = [];

// Set the view engine
app.set("view engine", "ejs");

app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/add", async(req, res) => {
    await Message.create({name : "Parijat",email:"parijat@123"})
    res.send("Data added successfully");
})

app.post("/login", (req, res) => {
    const messageData = {
        name: req.body.name,
        email: req.body.email
    }
    Message.create(messageData)

    res.render("success");
})


app.get("/users", (req, res) => {
    res.json({
        users
    })
})

app.listen(5000, ()=>{
    console.log("Server running on port 5000 http://localhost:5000");
})