import React, { useEffect, useState } from "react";
import Genres from "../Genres/Genres";
import MovieHour from "../MovieHour/MovieHour";

function ScheduleMovieList({ scheduledMovieList }) {
  const [movies, setMovies] = useState([]);

  //To simplify transform every object of scheduledMovieList array from {_id: '6650f5d342007bd7824ff52b', movie: {…}, time: '3pm', date: '2', __v: 0} to
  //object that contains all data of movie + time:

  useEffect(() => {
    const movieArr = scheduledMovieList.map((el) => {
      const newMovie = { ...el.movie, time: el.time };
      return newMovie;
    });
    setMovies(movieArr); //{adult: false, genres: Array(2), id: 1029575, image…,, time:'3pm'}
  }, [scheduledMovieList]);

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
    display: 'flex',
    marginTop: '15px',
    gap: '10px'
  }


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

  return (
    <div>
      <div>
        <div className="actualMovieContainer">
          {scheduledMovieList.length <= 0 ? (
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
