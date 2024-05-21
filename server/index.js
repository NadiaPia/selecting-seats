const express = require("express");
const mongoose = require('mongoose');
const app = express();
//const cors = require("cors");

app.use(express.json());

//Routers

const seatesRouter = require('./routes/seats.js');
app.use("/api/seats", seatesRouter)

app.get("/", (req, res) => {
    res.send("Hello from API")
});



mongoose.connect('mongodb+srv://piatetskaianadia:DYkZOXtWdspW8dKj@seats.ek4m5rj.mongodb.net/Seats?retryWrites=true&w=majority&appName=Seats')
.then(() => {
    console.log("Connected to database");
    app.listen(3003, () => {
        console.log("Server running on port 3003!")
    })
})
.catch(() => {
    console.log("Connection failed");
})