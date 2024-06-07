import React from 'react'

function MovieHour({ movieHours, styleHours }) {
  return (
    <div style={styleHours}>
      {movieHours.map((hour, i) => (
        <div className="movieHour" key={`hour-${i}`}>{hour}</div>
      ))}
    </div>
  )
}

export default MovieHour;
