import {
  Container, Grid,
  makeStyles
} from "@material-ui/core";
import AssessmentIcon from '@material-ui/icons/Assessment';
import MyStockChart from "./ganttChart";
import GanttReportForm from "./ganttChartFrom";

function GanttReport()  {

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
  const classes = useStyles();
  return (
    <div className="app_bar">
      <h1>Settings</h1>
      <Container className={classes.root} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <GanttReportForm  />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AssessmentIcon className={classes.iconStyle} />
        </Grid>
      </Grid>
    </Container>
      <MyStockChart/>
    </div>
  );
}

export default GanttReport;