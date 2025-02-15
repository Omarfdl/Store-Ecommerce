import React from "react";
import style from "./MainSlider.module.css";
import sliderImg1 from "../../assets/slider-image-1.jpeg";
import sliderImg2 from "../../assets/slider-image-2.jpeg";
import sliderImg3 from "../../assets/slider-image-3.jpeg";
import sliderImg4 from "../../assets/slider-2.jpeg";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";

export default function MainSlider() {
  const isSmallScreen = useMediaQuery({ maxWidth: 900 });

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
  };
  return (
    <>
      <div className="row">
        {!isSmallScreen ? (
          <>
            <div className="w-3/4">
              <Slider {...settings}>
                <img
                  className="w-full h-[400px] object-cover"
                  src={sliderImg3}
                  alt=""
                />
                <img
                  className="w-full h-[400px] object-cover"
                  src={sliderImg4}
                  alt=""
                />
              </Slider>
            </div>
            <div className="w-1/4">
              <img
                className="w-full h-[200px] object-cover"
                src={sliderImg1}
                alt=""
              />
              <img
                className="w-full h-[200px] object-cover"
                src={sliderImg2}
                alt=""
              />
            </div>
          </>
        ) : (
          <div className="w-full">
            <Slider {...settings}>
              <img
                className="w-full h-[400px] object-cover"
                src={sliderImg3}
                alt=""
              />
              <img
                className="w-full h-[400px] object-cover"
                src={sliderImg4}
                alt=""
              />
              <img
                className="w-full h-[400px] object-cover"
                src={sliderImg1}
                alt=""
              />
              <img
                className="w-full h-[400px] object-cover"
                src={sliderImg2}
                alt=""
              />
            </Slider>
          </div>
        )}
      </div>
    </>
  );
}
