import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "./Seats/Seats.css";
import "./components/Navbar/Navbar.css";
import "./components/ImageGallerySlides/ImageGallerySlides.css";

import Seats from "./Seats/Seats";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import ImageGallerySlides from "./components/ImageGallerySlides/ImageGallerySlides";


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <ImageGallerySlides/>

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
