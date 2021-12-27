import { Grid, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "450px",
    display: "block",
    margin: "10% auto",
    background: "white",
    borderRadius: "30px",
    "& .Mui-error": {
      color: "#986c6a",
    },
    "& .Mui-sucess": {
      color: "#74c69d",
    },
  },
}));

export interface FormProps {
  children: any;
}

const FormContainer: React.FC<FormProps> = (props) => {
  const { children } = props;
  const classes = useStyles();

  return <Grid className={classes.root}>{children}</Grid>;
};

export default FormContainer;
