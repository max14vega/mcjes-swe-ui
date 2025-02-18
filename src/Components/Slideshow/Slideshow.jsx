import React from 'react';
import Slider from 'react-slick';

const Slideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div>
      <Slider {...settings}>
        <div>
          <img src="/SlideShowHome/image1.jpg" alt="Image 1" />
        </div>
        <div>
          <img src="/SlideShowHome/image2.jpg" alt="Image 2" />
        </div>
        <div>
          <img src="/SlideShowHome/image3.jpg" alt="Image 3" />
        </div>
        <div>
          <img src="/SlideShowHome/image4.jpg" alt="Image 4" />
        </div>
        <div>
          <img src="/SlideShowHome/image5.jpg" alt="Image 5" />
        </div>
      </Slider>
    </div>
  );
};

export default Slideshow;
