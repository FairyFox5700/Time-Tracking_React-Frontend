import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ActivityType, WorkLogDetails } from "../../types/worklogs/worklogs";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Badge from "@material-ui/core/Badge";

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
  },
  title: {
    textDecoration: "underline",
    color: "#52154E",
    fontSize: "24px",
    paddingBottom: "10px",
  },
  columns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "0px",
  },
  button: {
    paddinTop: "0px",
    margin: "0px",
  },
});

const initWorkLogs: WorkLogDetails = {
  workLogId: "121212-1212-1212",
  userId: "121212-1212-1212",
  description: "Simple worklogs description",
  timeSpent: "23:11:11",
  activityType: ActivityType.CodeReview,
  startDate: new Date(),
  issueId: "121212-1212-1212",
  isApproved: false,
};
export interface WorkLogCardProps {
  workLog: WorkLogDetails;
}
const WorkLogCard: React.FC<WorkLogCardProps> = ({
  workLog = initWorkLogs,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h3" className={classes.title}>
          {ActivityType[workLog.activityType]}
        </Typography>
        <div className={classes.columns}>
          <Typography variant="body2" component="p">
            {workLog.description}
          </Typography>
          <Typography color="textSecondary">
            <Badge badgeContent={workLog.timeSpent} color="primary">
              <AccessTimeIcon />
            </Badge>
          </Typography>
        </div>
      </CardContent>
      <CardActions className={classes.button}>
        <Button size="small">Details</Button>
      </CardActions>
    </Card>
  );
};

export default WorkLogCard;
