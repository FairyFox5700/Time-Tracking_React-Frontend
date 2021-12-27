import { Container, Grid, makeStyles } from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import React from "react";
import ReportForm from "./reports/reportsForm";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: "30px",
    backgroundColor: "white",
    "& .MuiGrid-root ": {
      alignContent: "center",
      margin: "auto",
    },
  },
  iconStyle: {
    color: "#C490D1",
    width: 300,
    height: 300,
  },
});

function Reports() {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <ReportForm />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CloudDownloadIcon className={classes.iconStyle} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Reports;
