import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

function ImageGallerySlides() {

  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function imgUrl() {
    const id = rand(1, 200);
    return `https://picsum.photos/id/${id}/1920/1080`;
  }

  function createSlides(numSlides) {
    return Array.from({ length: numSlides }).map((_, index) => (
      <SwiperSlide key={index}>
        <img className="img" src={imgUrl()} alt="" style={{height: "400px", width: '100%'}} />
        <div className="gradient"></div>     
      </SwiperSlide>
    ));
  }

  return (
  <div className="group">
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}      
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
      navigation
      style={{zIndex: 1}}
    >
      {createSlides(5)}
    </Swiper>
    
    </div>
  )
}

export default ImageGallerySlides;





























// import React from 'react'
// /* eslint-disable import/no-anonymous-default-export */
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// // import './App.css';

// import 'swiper/css/autoplay';

// function ImageGallerySlides() {
  
//   function rand(min, max) {
//     return Math.floor(Math.random() * (max - min + 1) + min);
//   }
  
//   function imgUrl() {
//     const id = rand(1, 200);
//     return `https://picsum.photos/id/${id}/1920/1080`;
//   }
  
//   function createSlide() {
//     return (
//       <SwiperSlide>
//         <img className="img" src={imgUrl()} alt="" />
//       </SwiperSlide>
//     );
//   }
//   return (
    
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         slidesPerView={1}
//         navigation
//         autoplay={{ delay: 1000 }}
//         pagination={{ clickable: true }}
//       >
//         {createSlide()}
//         {createSlide()}
//         {createSlide()}
//         {createSlide()}
//       </Swiper>
    
//   )
// }

// export default ImageGallerySlides
