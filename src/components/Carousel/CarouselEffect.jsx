import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
//img with in curly braces coz img is a named export (see in data.js)
import {img} from "./img/data";
import classes from './carousel.module.css'
function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoplay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {/* To address the React warning about unique key props, index added as a unique key to each img element inside the map function.  CarouselEffect.jsx:9 Warning: Each child in a list should have a unique "key" prop.*/}
        {img.map((imgItemLink, index) => {
          return <img src={imgItemLink} alt="" key={index} />;
        })}
      </Carousel>
      {/* so that the imgages fade at the bottom; the div below overlaps with bottom portion of the carousel  */}
      <div className={classes.hero_img}></div>
    </div>
  );
}

export default CarouselEffect