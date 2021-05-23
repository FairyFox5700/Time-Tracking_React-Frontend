import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container, makeStyles } from "@material-ui/core";

var useStyles = makeStyles({
  wheel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    maxWidth: "450px",
    display: "flex",
    margin: "10% auto",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
const CircularUnderLoad: React.FC = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <CircularProgress disableShrink className={classes.wheel} />
    </Container>
  );
};
export default CircularUnderLoad;
