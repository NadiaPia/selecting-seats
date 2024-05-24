const mongoose = require('mongoose');

const MovieShema = mongoose.Schema({ 

    movieId: { type: String, required: true },
    timeSlot: [{type: mongoose.Schema.Types.Mixed, ref: "schedule"}],
}
);

const MovieModel = mongoose.model("Movie", MovieShema);
module.exports = MovieModel;