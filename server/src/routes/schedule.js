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

    //console.log("findMovieInDB.movieId", findMovieInDB.movieId); //1029575

    findMovieInDB.timeSlot.push({ movieSchedule });
    await findMovieInDB.save();
    console.log("Ready!!!");
    res.status(200).json(timeSlot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.get("/:day", async (req, res) => {
  try {
    const movies = [];
    const timeSlot = await ScheduleModel.find({ date: req.params.day });
    
    console.log("timeSlot", timeSlot) //[{_id: new ObjectId('6663a1265288f09772f0f740'), movie: new ObjectId('665033be8835b6058c9cdbd9'),  time: '1pm', date: '5',   __v: 0 }, {}]
    
    
    if (timeSlot.length < 1) {
      console.log("if statement")
      res.status(200).json({message: "No movies available for this date"});
      return
    }

    const longShortMovieIdAccordance = {};

    const getMoviIdString = await Promise.all(
      timeSlot.map(async (el) => {
        //this mapping returns an array of elements and we need to wait untill all elements returns using Promise all, otherwise, the code will continue after first element returns,
        const film = await MovieModel.find({ _id: el.movie }); //"664ffb8d1ab8993b4e58941b"
        //console.log("film", film)
        movies.push(film[0].movieId); //movies = ['155', '1029575']
        longShortMovieIdAccordance[el.movie] = film[0].movieId; //"664ffb8d1ab8993b4e58941b" : 1029575

      })
    );
    console.log("longShortMovieIdAccordancettttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt", longShortMovieIdAccordance)
    
    //console.log("movies", movies); //['976573',  '1143183', '466420',  '653346', '1143183', '155', '466420',  '19404', '1143183', '155']

    //Only 10 movies can be send from API (free version). As every movie may be scheduled several times per day, we have to send 
    //a unique movie's id in order API send 10 movies but not 10 schedules:

    const uniqueMovies = [...new Set(movies)]; 
    console.log("uuuuuuuuuuuuuuuuuuuuuniqueMovies", uniqueMovies); //[ '976573', '1143183', '466420', '653346', '155', '19404' ]
    //transform uniqueMovies array to array of arrays of 10 elements in order every pagination page contains 10 movies and senr requests from avery single pagination page:

    //console.log("longShortMovieIdAccordance", longShortMovieIdAccordance);
    
    // function chunkArray(array, size) {
    //   const result = [];
    //   for (let i = 0; i < array.length; i += size) {
    //     result.push(array.slice(i, i + size));
    //   }
    //   return result;
    // };

    // const groupedMovieIds = chunkArray(uniqueMovies, 10);
    // const item = groupedMovieIds[req.params.pagination - 1]
    // console.log("groupedMovieIdsqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq", groupedMovieIds)
    // console.log("item", item)
    

    const item = uniqueMovies.join(","); //1029575,1029575,1029575,278

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
    //console.log("response.dataxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", response.data)

    const modifiedTimeSlot = timeSlot.map((el) => {

      const shortId = Number(longShortMovieIdAccordance[el.movie]);     
      const movieDetails = moviesFromAPI.filter((m) => {
        return m.id === shortId;
      })[0]; //if there are several similat ids the array after the filtration will contain similar element, but the desired will be in [0] element of array 


      return { ...el._doc, movie: movieDetails }; //if I use just ...el, mongo db send a lot of extra info, but I need staff  only under the key ...el._doc 
    });

    
    res.status(200).json(modifiedTimeSlot);

    //console.log("modifiedTimeSlottttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt", modifiedTimeSlot)
    

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
