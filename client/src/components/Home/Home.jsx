import React, { useEffect, useState } from "react";
import axios from "axios";
import Genres from "../Genres/Genres";
import ReactPaginate from "react-paginate";

function Home({ movieList, setMovieList }) {
  // const [movieList, setMovieList] = useState([]);
  const [pagination, setPagitation] = useState(1)
  const [paginationLength, setPaginationLength] = useState(1)

  const getMovies = async () => {
    console.log("getMovies");
    try {
      console.log("send to the be");

      const response = await axios.get(`http://localhost:3003/movies/${pagination}`);

      console.log("All movies", response.data.movies);
      setMovieList(response.data.movies);
      console.log("response.data.paginationLengt", response.data.paginationLength)
      setPaginationLength(response.data.paginationLength)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovies();
  }, [pagination]);

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

  const handlePageClick = (event) => {    
    setPagitation(event.selected + 1)    
    console.log(`Clicked page: ${event.selected + 1}`);
  };

 
  return (
    <div className="homeContainer">
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
      <ReactPaginate 
          pageCount={paginationLength}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          // activeClassName="active"
          activeLinkClassName="active"
          previousClassName="prev-item"
          nextClassName="next-item"
          disabledClassName="disabled"
          breakClassName="break-item"
        />
    </div>
  );
}

export default Home;
