const mongoose = require('mongoose');

const ScheduleShema = mongoose.Schema({    
    movie: {type: mongoose.Schema.Types.ObjectId, ref: "movie", required: true},
    time: {type: String, required: true},
    date: {type: String, required: true},
});

const ScheduleModel = mongoose.model("Schedule", ScheduleShema);
module.exports = ScheduleModel;