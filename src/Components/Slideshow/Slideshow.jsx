import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";

const Slideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
  };

  return (
    <Box sx={{ maxWidth: "100%", mt: 5, padding: "0 0%" }}>
      <Slider {...settings}>
        <div>
          <img
            src="/Images/SlideshowHome/image1.png"
            alt="Slide 1"
            style={{
              width: "100%",
              height: "225px",
              objectFit: "cover",
              borderRadius: "0",
            }}
          />
        </div>
        <div>
          <img
            src="/Images/SlideshowHome/image2.png"
            alt="Slide 2"
            style={{
              width: "100%",
              height: "225px",
              objectFit: "cover",
              borderRadius: "0",
            }}
          />
        </div>
        <div>
          <img
            src="/Images/SlideshowHome/image3.png"
            alt="Slide 3"
            style={{
              width: "100%",
              height: "225px",
              objectFit: "cover",
              borderRadius: "0",
            }}
          />
        </div>
        <div>
          <img
            src="/Images/SlideshowHome/image4.png"
            alt="Slide 4"
            style={{
              width: "100%",
              height: "225px",
              objectFit: "cover",
              borderRadius: "0",
            }}
          />
        </div>
        <div>
          <img
            src="/Images/SlideshowHome/image5.png"
            alt="Slide 5"
            style={{
              width: "100%",
              height: "225px",
              objectFit: "cover",
              borderRadius: "0",
            }}
          />
        </div>
      </Slider>
    </Box>
  );
};

export default Slideshow;
