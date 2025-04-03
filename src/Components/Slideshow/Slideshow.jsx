import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography } from "@mui/material";
import '../../App.css'


const Slideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: true, // Ensure this is set to true to show navigation arrows
  };

  const captionStyle = {
    mt: 1,
    ml: 0,
    color: "gray",
    position: "relative",
    left: 0,
    width: "100%",
    display: "block",
    maxHeight: '200px',
    overflow: 'auto'
  };

  const separatorStyle = {
    border: '0', 
    height: '2px',
    backgroundColor: 'gray', 
    width: '99.9%', 
    margin: '8px 0' 
  };

  const boxStyle = {
    position: "relative",
    maxWidth: "100%",
    mt: 5,
    padding: "20px 2%",
    borderRadius: "0",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    overflow: "visible",
    backgroundColor: "white"
  };

  return (
    <Box sx={boxStyle}>
      <Slider {...settings}>
        <div>
          <img
            src="/Images/SlideshowHome/Image1.jpg"
            alt="Slide 1"
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              borderRadius: "2px",
            }}
          />
          <Typography variant="body2" align="left" sx={captionStyle}>
            <strong>Weevil with Mites | Scientific Name: Phyllobius sp.</strong>
            <hr style={separatorStyle} />
            This macro photograph captures a green weevil, identifiable by its
            elongated snout and compact, metallic green body. The weevil is
            infested with bright red mites, known as Trombidium holosericeum,
            which cling to various parts of its legs and thorax.
            <br />
            <br />
            Weevils are usually found on plants, where they feed on leaves.
          </Typography>
        </div>
        <div>
          <img
            src="/Images/SlideshowHome/Image2.jpg"
            alt="Slide 2"
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              borderRadius: "2",
            }}
          />
          <Typography variant="body2" align="left" sx={captionStyle}>
            <strong>
              Red Lily Beetle | Scientific Name: Lilioceris lilii.
            </strong>
            <hr style={separatorStyle} />
            The image features a striking red lily beetle perched delicately on
            a leaf. Its glossy, bright red carapace contrasts with its black
            legs and antennae against a green background.
            <br />
            <br />
            This beetle is a well-known pest, causing significant damage to lily
            plants.
          </Typography>
        </div>
        <div>
          <img
            src="/Images/SlideshowHome/Image3.jpg"
            alt="Slide 3"
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              borderRadius: "2",
            }}
          />
          <Typography variant="body2" align="left" sx={captionStyle}>
            <strong>Honeybee on Twig | Scientific Name: Apis mellifera.</strong>
            <hr style={separatorStyle} />
            Displayed is a close-up of a honeybee clasping onto the jagged edge
            of a twig. The bee's intricate wings shimmer with a subtle
            iridescence, and its body is covered with fine hairs that collect
            pollen.
            <br />
            <br />
            Honeybees are vital for pollination and are responsible for
            pollinating about one-third of the food crops humans consume.
          </Typography>
        </div>
        <div>
          <img
            src="/Images/SlideshowHome/Image4.jpg"
            alt="Slide 4"
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              borderRadius: "2px",
            }}
          />
          <Typography variant="body2" align="left" sx={captionStyle}>
            <strong>
              Grasshopper on Branch | Scientific Name: Caelifera sp.
            </strong>
            <hr style={separatorStyle} />
            The grasshopper's detailed exoskeleton, displaying hues of green and
            textures that mimic leaf veins, blends seamlessly with its
            environment. Its long antennae and powerful hind legs illustrate its
            adaptability.
            <br />
            <br />
            Grasshoppers can jump many times their body length and produce
            sounds to communicate.
          </Typography>
        </div>
        <div>
          <img
            src="/Images/SlideshowHome/Image5.jpg"
            alt="Slide 5"
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              borderRadius: "2px",
            }}
          />
          <Typography variant="body2" align="left" sx={captionStyle}>
            <strong>Wasp on Leaf | Scientific Name: Vespula germanica.</strong>
            <hr style={separatorStyle} />
            This close-up shows a wasp on a leaf, highlighting its yellow and
            black body and formidable appearance.
            <br />
            <br />
            Wasps are capable of stinging multiple times and play a role in
            natural pest control, though they are less effective pollinators
            than bees.
          </Typography>
        </div>
      </Slider>
    </Box>
  );
};

export default Slideshow;
