import React, { useEffect, useState } from "react";
import axios from "axios";
import secrets from '../../secrets.json';

function Home() {
  const [movieList, setMovieList] = useState([]);

  async function upcomingMovies() {
    const options = {
      method: "GET",
      url: "https://moviesdatabase.p.rapidapi.com/titles/x/upcoming",
      params: { year: "2024" },
      headers: {
        "X-RapidAPI-Key": secrets.SECRET_KEY,
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log("upcoming response.data.results", response.data.results);
      //console.log("upcoming response.data", response.data);

      setMovieList(response.data.results);
    } catch (error) {
      console.error(error);
    }
  }

  async function randomMovies() {
    const options = {
        method: 'GET',
        url: 'https://moviesdatabase.p.rapidapi.com/titles/random',
        params: {
            list: 'top_rated_series_250'
          },
        headers: {
          'X-RapidAPI-Key': 'c9ac30b2cfmshadbd65ba3f40306p1597eajsn9a3ec72084e4',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data.results);
      setMovieList(response.data.results);

      } catch (error) {
          console.error(error);
      }
  }

  

  useEffect(() => {
    randomMovies();
  }, []);

  return (
    <div>
      Home page
      <div>
        {movieList.map((movie) => (
          <div key={movie._id}>
            <img
              alt="movie"
              src={movie?.primaryImage?.url}
              style={{ width: "250px" }}
            />
            <div>{movie?.titleText?.text}</div>
            {/* <div>{movie?.releaseDate?.month}</div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
