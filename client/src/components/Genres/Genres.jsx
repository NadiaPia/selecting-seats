import React from "react";
import Genre from "../Genre/Genre";

function Genres({ genres, styleGenres={}, styleGenre={} }) {


  return (
    <div style={styleGenres}>
      {genres.map((genre) => (     
        <Genre key={genre.id} name={genre.name} styleGenre={styleGenre}/>
      ))}
    </div>
  );
}

export default Genres;
