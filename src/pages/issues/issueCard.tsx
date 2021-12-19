import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./issueCard.css";
import Avatar from "@material-ui/core/Avatar";
import { IssueDetailedModel, Status } from "../../types/issues/isues";
import { issuesReducer } from "../../redux/reducers/issuesReducer";
import { CardHeader, LinearProgress } from "@material-ui/core";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import AvatarItem from "../../components/kanban/avatar";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 151,
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  })
);
export interface IssueCardProps {
  issue: IssueDetailedModel;
}

const IssueGradientCard: React.FC<IssueCardProps> = (props: IssueCardProps) => {
  const classes = useStyles();
  const { issue } = props;
  const setBackground = (issue: IssueDetailedModel) => {
    switch (issue.status) {
      case Status.Open:
        return "bg-gr-red";
      case Status.Closed:
        return "bg-gr-green";
      case Status.Review:
        return "bg-gr-purple";
      default:
        return "bg-gr-blue";
    }
  };
  const classNameForBg = `issue_card ${setBackground(issue)}`;
  return (
    <Card className={classNameForBg}>
      <CardHeader>
        <Typography component="h5" variant="h5">
          {issue.title}
        </Typography>
      </CardHeader>
      <CardContent>
        <AvatarItem
          name={issue.assignedUserFirstName}
          surname={issue.assignedUserLastName}
          label="Assignee"
        />
        <AvatarItem
          name={issue.reportedByUserFirstName}
          surname={issue.reportedByLastName}
          label="Assignee"
        />
        <Typography variant="h5" gutterBottom>
          <span>Status:</span> {issue.status}
        </Typography>
        <Typography variant="h5" gutterBottom>
          <span>Updated at:</span> {issue.updatedAt}
        </Typography>
        <Typography variant="h5" gutterBottom>
          <span>Opened at:</span> {issue.openedAt}
        </Typography>
        <Typography variant="h5" gutterBottom>
          <span>Closed at:</span> {issue.closedAt}
        </Typography>
        <LinearProgress
          variant="buffer"
          value={issue.totalSpentTimeInSeconds}
          valueBuffer={issue.totalRemainingTimeInSeconds}
        />
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default IssueGradientCard;
