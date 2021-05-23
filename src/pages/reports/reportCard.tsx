import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { WorkLogDetails } from "../../types/worklogs/worklogs";
import { ToArray } from "../../utils/enumUtils";
import { ReportType } from "../../types/report/report";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: "inline-block",
    boxShadow: "0 7px 16px #d7e0ea",
    borderRadius: "6px",
    borderTop: "5px solid #C490D1",
    paddingRight: "30px",
    margin: "10px",
    "& .MuiCardContent-root": {
      paddingBottom: "0px",
    },
    "& .MuiGrid-root": {
      marginBottom: "8px",
    },
  },
  title: {
    color: "#52154E",
    fontSize: "24px",
    paddingBottom: "10px",
  },
  columns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddinTop: "0px",
    margin: "0px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  iconStyle: {
    color: "#C490D1",
    width: 100,
    height: 100,
  },
});

export interface ReportLogCardProps {
  workLog: WorkLogDetails;
}
const ReportCard: React.FC<ReportLogCardProps> = () => {
  const reportTypes = ToArray(ReportType);
  const classes = useStyles();

  return (
    <div className="app_bar">
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h3" className={classes.title}>
            {reportTypes[0]}
          </Typography>
          <div className={classes.columns}>
            <InsertChartIcon className={classes.iconStyle} />
            <Link to="/generate-report">
              <Button size="small">Generate</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportCard;
