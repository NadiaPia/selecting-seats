import React from 'react'

function MovieHour({ movieHours, styleHours }) {

    const sortTime = (arr) => {
        const getArr24Format = arr.map((val) => {
          let h = Number(
            val
              .split("")
              .filter((el) => el !== "p" && el !== "a" && el !== "m")
              .join("")
          );
      
          if (val.includes("pm") && h < 12) {
            h = h + 12;
            return h;
          } else if (val.includes("am") && h === 12) {
            h = h - 12;
          }
          return h;
        });
      
        const sortArr24Format = getArr24Format.sort(function (a, b) {
          return a - b;
        });
      
        const make12TimeFormat = sortArr24Format.map((num) => {
          if (num === 0) return (num + 12).toString() + "am";
          else if (num === 12) return num.toString() + "pm";
          return num < 12 ? num.toString() + "am" : (num - 12).toString() + "pm";
        });
        return make12TimeFormat;
      
      }; 

      const sortedHours = sortTime(movieHours)

  return (
    <div style={styleHours}>
      {sortedHours.map((hour, i) => (
        <div className="movieHour" key={`hour-${i}`}>{hour}</div>
      ))}
    </div>
  )
}

export default MovieHour;
