const express = require("express");
const ScheduleModel = require('../models/schedule.model.js');
const MovieModel = require('../models/movies.model.js');


const router = express.Router();

//      /schedule

router.post("/", async (req, res) => {
    try{
        const timeSlot = await ScheduleModel.create(req.body); //timeSlot { movie: new ObjectId('664ffb8d1ab8993b4e58941b'), time: '3pm', date: '2',  _id: new ObjectId('6650e89314e16665e2dcf5cc'),  __v: 0 }
        
        const movieSchedule = timeSlot._id; //timeslot._id new ObjectId('6650e6ebe30ca25b45f04c69')         
        
        const findMovieInDB = await MovieModel.findById(timeSlot.movie)  //{_id: new ObjectId('664ffb8d1ab8993b4e58941b'),  movieId: '1029575',  __v: 0}

        console.log("findMovieInDB.movieId", findMovieInDB.movieId) //1029575
        
        findMovieInDB.timeSlot.push({movieSchedule})
        await findMovieInDB.save();
        console.log("Ready!!!")
        res.status(200).json(timeSlot)


    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get("/", async (req, res) => {
    try{
        const timeSlot = await ScheduleModel.find(req.body);
        res.status(200).json(timeSlot)
        console.log("timeslot created")
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;