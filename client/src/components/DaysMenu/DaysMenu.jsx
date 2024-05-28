import React from 'react';
import axios from "axios";

function DaysMenu() {

    function transformDate(number) {
        const weekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thirsday", "Friday", "Saturday"];
        const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
       
        const weekDay = new Date(number).getDay() //get weekday
        const day = new Date(number).getDate()     //get day   
        const month = new Date(number).getMonth()    //get month   

        const stringDate = weekArray[weekDay] + "," + " " + monthsArray[month] + " " + day        
        return stringDate
    }   

    const filterMovies = async(i) => {
        try {
            const response = await axios.get(`http://localhost:3003/schedule/${i}`)
            console.log("to filter", response.data)

        } catch(err) {

        }
    }

   
  return (
    
      <div className="daysMenuContainer">
        {[...(new Array(6))].map((el, i) => (
        <div className="dayBox" key={i} onClick={() => filterMovies(i)}>
            {i === 0 ? "Today" : (i === 1? "Tomorrow" : transformDate(new Date().setDate(new Date().getDate() + i)))}
        </div>))}
       
      </div>
  
  )
}

export default DaysMenu;
