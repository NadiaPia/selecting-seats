import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import "./App.css";
import "./components/Seats/Seats.css";
import "./components/Navbar/Navbar.css";
import "./components/Home/Home.css";
import "./components/DaysMenu/DaysMenu.css";
import "./components/RegLogBox/RegLogBox.css";
import "./components/Genres/Genres.css";
import "./components/ScheduleMovieList/ScheduleMovieList.css";
import "./components/MovieHour/MovieHour.css";




import "./components/ImageGallerySlides/ImageGallerySlides.css";

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import ImageGallerySlides from "./components/ImageGallerySlides/ImageGallerySlides";
import DaysMenu from "./components/DaysMenu/DaysMenu";
import ScheduleMovieList from "./components/ScheduleMovieList/ScheduleMovieList";

function App() {

  const [movieList, setMovieList] = useState([]);
  const [scheduledMovieList, setScheduledMovieList] = useState([]);
  
  return (
    <div>
      <Router>
        <Navbar />
        <ImageGallerySlides/>
        <DaysMenu setScheduledMovieList={setScheduledMovieList}/>        

        <Routes>
          <Route path="/" element={<Home setMovieList={setMovieList} movieList={movieList}/>} />
          <Route path="/schedule" element={<ScheduleMovieList scheduledMovieList={scheduledMovieList}/>} />

        </Routes>

      </Router>
    </div>
  );
}

export default App;
