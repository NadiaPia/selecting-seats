const express = require("express");
const MovieModel = require("../models/movies.model.js");
const axios = require("axios");

const router = express.Router();

//   /movies

router.post("/", async (req, res) => {
  try {
    const movie = await MovieModel.create(req.body);
    res.status(200).json(movie);
    console.log("response sent");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await MovieModel.find({});
    const movieIds = response.map((el) => el.movieId);
    const item = movieIds.join(","); //466420,1029575,976573

    //https://rapidapi.com/netostbatista-8PFB2-57zTu/api/tvshow/

    const options = {
      method: "GET",
      url: "https://tvshow.p.rapidapi.com/Movie/Detail",
      params: {
        Items: `${item}`,
        Language: "en-US",
      },
      headers: {
        "x-rapidapi-key": `${process.env.X_RAPIDAPI_KEY}`,
        "x-rapidapi-host": "tvshow.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const movies = response.data;
      res.status(200).json(movies);
    } catch (error) {
      console.error(error);
    }
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
