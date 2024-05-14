import { useState } from "react";
import "./Seats.css";

export default function Seats() {
  const [selectedSeats, setSelectedSeats] = useState([]);


  const numberOfTickets = 1;

  const seatsSchemeObj = { A: 8, B: 10, C: 10, D: 20, E: 5, F: 20 };

  
  const choseSeat = (i) => {
    //prev make sure it will take previous value of state
    setSelectedSeats((prev) => {
      const newSeats = [...prev];
      if (newSeats.length <= numberOfTickets - 1) {
        newSeats.push(i);
        console.log("newSeats", newSeats);
      } else {
        newSeats.splice(0, 1);
        newSeats.push(i);
        console.log("newSeats", newSeats);
      }

      return newSeats;
    });
  };

  return (
    <>
      <div className="screenContainer">SCREEN</div>
      <div className="seatsContainer">
        {Object.entries(seatsSchemeObj).map((el) => (
          <div className="rowSeatsContainer" key={el[0]}>
            {Array.from({ length: el[1] }).map((seat, i) => (
              <Seat
                key={`${el[0]}${i}`}
                onChoseSeat={() => choseSeat(`${el[0]}${i}`)}
                isSelected={selectedSeats?.includes(`${el[0]}${i}`)}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function Seat({ onChoseSeat, isSelected }) {
  return (
    <div
      className={isSelected ? "activeSeat" : "seat"}
      onClick={onChoseSeat}
    ></div>
  );
}
