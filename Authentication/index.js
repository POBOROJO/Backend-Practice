const express = require("express");

const app = express();

app.use(express.json());// this is not used to parse html form data only applicable for json

// Add this middleware to parse form data
app.use(express.urlencoded({ extended: true }));


const users = [];

// Set the view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
})

app.post("/login", (req, res) => {
    users.push({
        username: req.body.name,
        email: req.body.email
    })
    res.send("User Logged In successfully");
})


app.get("/users", (req, res) => {
    res.json({
        users
    })
})

app.listen(5000, ()=>{
    console.log("Server running on port 5000");
})