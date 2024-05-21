const express = require("express");
const SeatModel = require('../models/seats.model.js');

const router = express.Router();

router.post("/", async (req, res) => {
    try{
        const seat = await SeatModel.create(req.body);
        res.status(200).json(seat)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get("/", async(req, res) => {
    try {
        const seats = await SeatModel.find({});
        res.status(200).json(seats)
    } catch (error)  {
        res.status(500).json({message: error.message});
    }
})

router.get("/:id", async(req, res) => {
    try {
       const id = req.params.id;
       const seat = await SeatModel.findById(id);
       res.status(200).json(seat)
    } catch (error)  {
        res.status(500).json({message: error.message});
    }
})

module.exports = router;