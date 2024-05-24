const mongoose = require('mongoose');

const SeatShema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }},
    {
        timestamps: true,
    }
);

const SeatModel = mongoose.model("Seat", SeatShema);
module.exports = SeatModel;