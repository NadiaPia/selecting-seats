import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DaysMenu({active, setActive}) {

  const navigate = useNavigate();
  
  useEffect(() => {
    localStorage.setItem("active", active);
  }, [active]);

  useEffect(() => {
    active === 100 ? navigate("/") : setActive(active)
  }, []); 

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

  return (
    <div>
    
    <div className="daysMenuContainer">
      <div className={active === 100 ? "dayBox active" : "dayBox"} key={`schedDay-${100}`} onClick={() => {navigate("/"); setActive(100)}}>
        All Movies
      </div>

      {[...new Array(6)].map((el, i) => (
        <div
          className={active === i ? "dayBox active" : "dayBox"}
          key={`schedDay-${i}`}
          onClick={() => {setActive(i); navigate(`/schedule/?day=${i}`)}}
        >
          {i === 0
            ? "Today"
            : i === 1
            ? "Tomorrow"
            : transformDate(new Date().setDate(new Date().getDate() + i))}
        </div>
      ))}
    </div>
    </div>
  );
}

export default DaysMenu;
