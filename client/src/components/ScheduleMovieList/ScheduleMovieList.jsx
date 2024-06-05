import React from "react";

function ScheduleMovieList(props) {
  return (
    <div>
      <div>
        <div className="actualMovieContainer">
          {props.scheduledMovieList.length <= 0 ? (
            <div>No movies available for this date</div>
          ) : (
            props.scheduledMovieList.map((movie) => (
              <div key={movie._id}>
                <div className="movieContainer">
                  <div className="picture">
                    <img
                      alt="movie"
                      src={movie?.movie?.image}
                      style={{ width: "340px", height: "490px" }}
                    />
                  </div>
                </div>

                <div>{movie?.movie?.title}</div>
                {/* <div>{movie?.releaseDate?.month}</div> */}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ScheduleMovieList;
