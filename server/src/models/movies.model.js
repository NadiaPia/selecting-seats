const mongoose = require('mongoose');

const MovieShema = mongoose.Schema({
    movieId: {
        type: String,
        required: true
    }}
);

const MovieModel = mongoose.model("Movie", MovieShema);
module.exports = MovieModel;