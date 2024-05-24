import React, { useEffect, useState } from "react";
import axios from "axios";
import secrets from "../../secrets.json";

function Home() {
  const [movieList, setMovieList] = useState([]);
  

  const getMovies = async () => {
    try {
      const response = await axios.get("http://localhost:3003/movies");
      console.log(response.data);
      setMovieList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <div className="actualMovieContainer">
        {movieList.map((movie) => (
          <div key={movie.id}>

            
            <div className="movieContainer">
              <div className="picture">
                <img
                  alt="movie"
                  src={movie?.image}
                  style={{ width: "340px", height: "490px" }}
                />
              </div>
            </div>

            <div>{movie?.title}</div>
            {/* <div>{movie?.releaseDate?.month}</div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
