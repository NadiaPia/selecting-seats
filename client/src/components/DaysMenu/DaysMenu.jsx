import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function DaysMenu(props) {
  
  const [active, setActive] = useState(100);
  const [searchParams, setSearchParams] = useSearchParams();


  const navigate = useNavigate();

  useEffect(() => {
    console.log("date changed", searchParams.get("day"));
    
  }, [searchParams.get("day")]);

  function transformDate(number) {
    const weekArray = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thirsday",
      "Friday",
      "Saturday",
    ];
    const monthsArray = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    

    const weekDay = new Date(number).getDay(); //get weekday
    const day = new Date(number).getDate(); //get day
    const month = new Date(number).getMonth(); //get month

    const stringDate =
      weekArray[weekDay] + "," + " " + monthsArray[month] + " " + day;
    return stringDate;
  }

  const filterMovies = async (i) => {
    console.log("iiiiii", i);
    try {
        setActive(i);
      const response = await axios.get(`http://localhost:3003/schedule/${i}`);
      console.log("to filter", response.data);
      navigate(`/schedule/?day=${i}`);
      

      if(response.data.message) {
        console.log("setScheduledMovieList", response.data)
       props.setScheduledMovieList([])
      } else {
          props.setScheduledMovieList(response.data);
      }
      
    } catch (err) {}
  };

//   const showAllMovies = (k) => {
//     setActive(k); 
//     navigate("/");
//   }

  return (
    <div className="daysMenuContainer">
      <div className={active === 100 ? "dayBox active" : "dayBox"} key={`schedDay-${100}`} onClick={() => {navigate("/"); setActive(100)}}>
        All Movies
      </div>

      {[...new Array(6)].map((el, i) => (
        <div
          className={active === i ? "dayBox active" : "dayBox"}
          key={`schedDay-${i}`}
          onClick={() => filterMovies(i)}
        >
          {i === 0
            ? "Today"
            : i === 1
            ? "Tomorrow"
            : transformDate(new Date().setDate(new Date().getDate() + i))}
        </div>
      ))}
    </div>
  );
}

export default DaysMenu;
