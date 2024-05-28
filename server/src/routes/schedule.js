const express = require("express");
const ScheduleModel = require("../models/schedule.model.js");
const MovieModel = require("../models/movies.model.js");
const axios = require("axios");

const router = express.Router();

//      /schedule

router.post("/", async (req, res) => {
  try {
    const timeSlot = await ScheduleModel.create(req.body); //timeSlot { movie: new ObjectId('664ffb8d1ab8993b4e58941b'), time: '3pm', date: '2',  _id: new ObjectId('6650e89314e16665e2dcf5cc'),  __v: 0 }

    const movieSchedule = timeSlot._id; //timeslot._id new ObjectId('6650e6ebe30ca25b45f04c69')

    const findMovieInDB = await MovieModel.findById(timeSlot.movie); //{_id: new ObjectId('664ffb8d1ab8993b4e58941b'),  movieId: '1029575',  __v: 0}

    console.log("findMovieInDB.movieId", findMovieInDB.movieId); //1029575

    findMovieInDB.timeSlot.push({ movieSchedule });
    await findMovieInDB.save();
    console.log("Ready!!!");
    res.status(200).json(timeSlot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*

router.get("/:day", async (req, res) => {
  try {
    //console.log("req.params.day", req.params.day);
    const timeSlot = await ScheduleModel.find({ date: req.params.day });
    //console.log("timeSlot", timeSlot)

    const movies = [];
    const filterMovies = await timeSlot.map(async (el) => {
      const film = await MovieModel.find({ _id: el.movie });
      //console.log("film", film[0].movieId);
      movies.push(film[0].movieId);
      //console.log("movies", movies);
      const item = movies.join(","); //1029575,1029575,1029575
      //console.log("items", item);

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
    //   const response = await axios.request(options);
    //   const moviesFromAPI = response.data;

      //   try {
      //     // const response = await axios.request(options);
      //     // const moviesFromAPI = response.data;
      //     //console.log("moviesFromAPI", moviesFromAPI)
      //     //res.status(200).json(movies);
      //   } catch (error) {
      //     console.error(error);
      //   }
    });
    //console.log("filterMovies", filterMovies);

    // const arr = [{"name": "nadia"}, {"name": "petia"}]
    // const modifiedArr = arr.map((el) =>  {return {name: "tania"}})
    // console.log("modifiedArrrrrrrrrrrrr", modifiedArr)
    //res.status(200).json(timeSlot)
    const modifiedTimeSlot = timeSlot.map((el) => {
      return { movie: { moviesFromAPI } };
    });
    res.status(200).json(timeSlot); //[ { "_id": "6650f995e2dec6be3e4612b3", "movie": "664ffb8d1ab8993b4e58941b", "time": "12pm", "date": "3",  "__v": 0  }]
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});*/

// router.get("/:day", async (req, res) => {
//     try {
//       const timeSlot = await ScheduleModel.find({ date: req.params.day });
//       const movies = [];

//       const filterMovies = await timeSlot.map(async (el) => {
//         const film = await MovieModel.find({ _id: el.movie });
//         movies.push(film[0].movieId);
//         const item = movies.join(","); //1029575,1029575,1029575

//         const options = {
//           method: "GET",
//           url: "https://tvshow.p.rapidapi.com/Movie/Detail",
//           params: {
//             Items: `${item}`,
//             Language: "en-US",
//           },
//           headers: {
//             "x-rapidapi-key": `${process.env.X_RAPIDAPI_KEY}`,
//             "x-rapidapi-host": "tvshow.p.rapidapi.com",
//           },
//         };
//          const response = await axios.request(options);
//          const moviesFromAPI = response.data;

//         //   try {
//         //     // const response = await axios.request(options);
//         //     // const moviesFromAPI = response.data;
//         //     //console.log("moviesFromAPI", moviesFromAPI)
//         //     //res.status(200).json(movies);
//         //   } catch (error) {
//         //     console.error(error);
//         //   }

//         const modifiedTimeSlot = timeSlot.map((el) => {
//             return {...el, movie:  moviesFromAPI};
//           });
//           res.status(200).json(modifiedTimeSlot); //[ { "_id": "6650f995e2dec6be3e4612b3", "movie": "664ffb8d1ab8993b4e58941b", "time": "12pm", "date": "3",  "__v": 0  }]

//       });

//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });

router.get("/:day", async (req, res) => {
  try {
    const movies = [];
    const timeSlot = await ScheduleModel.find({ date: req.params.day });
    const longShortMovieIdAccordance = {};

    const getMoviIdString = await Promise.all(
      timeSlot.map(async (el) => {
        //this mapping returns an array of elements and we need to wait untill all elements returns using Promise all, otherwise, the code will continue after first element returns,
        const film = await MovieModel.find({ _id: el.movie }); //"664ffb8d1ab8993b4e58941b"
        //console.log("film", film)
        movies.push(film[0].movieId);
        longShortMovieIdAccordance[el.movie] = film[0].movieId; //"664ffb8d1ab8993b4e58941b" : 1029575
      })
    );

    console.log("longShortMovieIdAccordance", longShortMovieIdAccordance);
    const item = movies.join(","); //1029575,1029575,1029575,278

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
    const response = await axios.request(options);
    const moviesFromAPI = response.data;

    const modifiedTimeSlot = timeSlot.map((el) => {

      const shortId = Number(longShortMovieIdAccordance[el.movie]);     
      const movieDetails = moviesFromAPI.filter((m) => {
        return m.id === shortId;
      })[0]; //if there are several similat ids the array after the filtration will contain similar element, but the desired will be in [0] element of array 


      return { ...el._doc, movie: movieDetails }; //if I use just ...el, mongo db send a lot of extra info, but I need staff  only under the key ...el._doc 
    });

    res.status(200).json(modifiedTimeSlot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
