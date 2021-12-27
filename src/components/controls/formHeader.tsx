import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

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

const FormHeader: React.FC<HeaderProps> = (props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <Typography variant="h4" className={classes.root}>
      {children}
    </Typography>
  );
};

export default FormHeader;
