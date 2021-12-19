import { ArrowForward, ArrowRight } from "@material-ui/icons";
import React, { useState } from "react";
import Video from "../../videos/video.mp4";
import "./hero.css";
import { Link } from "react-router-dom";
const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };

  return (
    <div className="hero-container">
      <video className="video_backgound" autoPlay loop muted src={Video} />
      <h1> Get rid of boring spint planning</h1>
      <p>
        Sign in to time tracking system today and get all featers in one place
        to speed up your project development now
      </p>
      <div className="hero_button_wrapper">
        <Link to="/signup" onMouseEnter={onHover} onMouseLeave={onHover}>
          <button className="hero_btn">
            Get started{" "}
            {hover ? (
              <ArrowForward className="arrow_forward" />
            ) : (
              <ArrowRight className="arrow_right" />
            )}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
