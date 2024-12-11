import React, { useEffect, useState } from "react";
import Genres from "../Genres/Genres";
import MovieHour from "../MovieHour/MovieHour";
import axios from "axios";
//import { useSearchParams } from "react-router-dom";
//import ReactPaginate from "react-paginate";

function ScheduleMovieList({ active, setPagitation }) {
  const [movies, setMovies] = useState([]);
  // const [paginationArray, setPaginationArray] = useState([]);
  // const [searchParams, setSearchParams] = useSearchParams();
  const [scheduledMovieList, setScheduledMovieList] = useState([]);

  const filterMovies = async (i) => {
    try {
      const response = await axios.get(`http://localhost:3003/schedule/${i}`);
      if (response.data.message) {
        console.log("setScheduledMovieList", response.data);
        setScheduledMovieList([]);
      } else {
        setScheduledMovieList(response.data);
        console.log("setScheduledMovieList(response.data)", response.data)
      }
    } catch (err) {}
  };

  // useEffect(() => {
  //     console.log("searchParams.getday", searchParams.get("day"));
  //   }, [active]);

  //To simplify transform every object of scheduledMovieList array from {_id: '6650f5d342007bd7824ff52b', movie: {…}, time: '3pm', date: '2', __v: 0} to
  //object that contains all data of movie + time:

  // Fetch movies when `active` changes:
  
  useEffect(() => {
    filterMovies(active);    
    //const idsArray = [...new Set(scheduledMovieList.map((el) => el.movie.id))]; //to count a quantity movies for pagiantion rendering    
    //setPaginationArray(idsArray);
  }, [active]);

  // Process `scheduledMovieList` when it updates
useEffect(() => {
  const movieArr = scheduledMovieList.map((el) => { //const idsArray = [...new Set(scheduledMovieList.map((el) => el.movie.id))]; //to count a quantity movies for pagiantion rendering
    const newMovie = { ...el.movie, time: el.time };
    return newMovie;
  });

  setMovies(movieArr); // Update movies state: {adult: false, genres: Array(2), id: 1029575, image…,, time:'3pm'}
}, [scheduledMovieList]); // Re-run when `scheduledMovieList` changes



  const styleGenres = {
    display: "flex",
    flexDirection: "row",
    gap: "7px",
    flexWrap: "wrap",
  };

  const styleGenre = {
    backgroundColor: "#DEDEE0",
    padding: "5px",
    color: "#727276",
  };

  const styleHours = {
    display: "flex",
    marginTop: "15px",
    gap: "10px",
  };

  const combinedMovies = Object.values(
    movies.reduce((acc, movie) => {
      if (!acc[movie.id]) {
        acc[movie.id] = { ...movie, time: [movie.time] };
      } else {
        acc[movie.id].time.push(movie.time);
      }
      return acc;
    }, {})
  );
  //console.log("combinedMovies", combinedMovies);

  // const handlePageClick = (event) => {
  //   setPagitation(event.selected + 1);
  //   console.log(`Clicked page: ${event.selected + 1}`);
  // };

  return (
    <div className="scheduledMovieContainer">
      <div>
        <div className="actualMovieContainer">
          {scheduledMovieList.length === 0 ? (
            <div>No movies available for this date</div>
          ) : (
            combinedMovies.map((movie) => (
              <div key={movie.id} className="movieContainer">
                <div className="picture">
                  <img
                    alt="movie"
                    src={movie?.image}
                    style={{ width: "340px", height: "490px" }}
                  />
                </div>

                <div className="movieTitle">{movie?.title}</div>
                <Genres
                  genres={movie.genres}
                  styleGenres={styleGenres}
                  styleGenre={styleGenre}
                />
                <MovieHour movieHours={movie.time} styleHours={styleHours} />
              </div>
            ))
          )}
        </div>
      </div>
      
      
    </div>
  );
}

export default ScheduleMovieList;
