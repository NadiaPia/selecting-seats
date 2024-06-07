import React, { useEffect, useState } from "react";
import axios from "axios";
import Genres from "../Genres/Genres";

function Home({ movieList, setMovieList }) {
  // const [movieList, setMovieList] = useState([]);

  const getMovies = async () => {
    try {
      const response = await axios.get("http://localhost:3003/movies");
      console.log("All movies", response.data);
      setMovieList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

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

  return (
    <div>
      <div className="actualMovieContainer">
        {movieList.map((movie) => (
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
            

            {/* <div>{movie?.releaseDate?.month}</div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
