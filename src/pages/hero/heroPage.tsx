import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Header from "../../components/header";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    margin: "10px",
    paddingTop: "10px",
    fontSize: "30px",
    fontWeight: "bold",
    color: "#143642",
    fontFamily: "Sans-serif",
  },
}));

export interface HeaderProps {
  children: any;
}

const HeroSection = () => {
  return (
    <>
      <HeroSection />
    </>
  );
};

export default HeroSection;
