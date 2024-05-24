const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");


require("dotenv").config();


const app = express();


app.use(express.json());
app.use(cors());

//Routers

const seatesRouter = require('./routes/seats.js');
app.use("/seats", seatesRouter)

const moviesRouter = require('./routes/movies.js');
app.use("/movies", moviesRouter)

const scheduleRouter = require('./routes/schedule.js');
app.use("/schedule", scheduleRouter)





app.get("/", (req, res) => {
    res.send("Hello from API")
});



mongoose.connect(`mongodb+srv://piatetskaianadia:${process.env.DATABASE_PASSWORD}@seats.ek4m5rj.mongodb.net/Seats?retryWrites=true&w=majority&appName=movietime`)
.then(() => {
    console.log("Connected to database");
    app.listen(3003, () => {
        console.log("Server running on port 3003!")
    })
})
.catch((err) => {
    console.log("Connection failed");
    console.log(err)
})