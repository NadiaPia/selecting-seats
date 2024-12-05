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

router.get("/:pagination", async (req, res) => {
  console.log("req****************************************************************************************************", req.body)
  console.log('request to the API starting!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  console.log("req.params.paginationnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", req.params.pagination)
  try {
    const response = await MovieModel.find({});
    const movieIds = response.map((el) => el.movieId);
    console.log("movieIdssssssssssssssssssssssssssssss", movieIds)

    function chunkArray(array, size) {
      const result = [];
      for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
      }
      return result;
    }

    
    const groupedMovieIds = chunkArray(movieIds, 10);
    console.log("groupedMovieIdsssssssss", groupedMovieIds)

    //const item = movieIds.slice(0, 10).join(","); //466420,1029575,976573
    const item = groupedMovieIds[req.params.pagination - 1]

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
      res.status(200).json({movies, paginationLength: groupedMovieIds.length});
    } catch (error) {
      console.error("errorerrorerrorerrorerrorerrorerrorerrorerrorerrorerrorerrorerrorerror", error?.response?.data);
    }
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
