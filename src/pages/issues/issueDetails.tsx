import React, { Dispatch, useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./issueCard.css";
import Avatar from "@material-ui/core/Avatar";
import { IssueDetailedModel, Status } from "../../types/issues/isues";
import {
  Box,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import AvatarItem from "../../components/kanban/avatar";
import { PagedRequest } from "../../types/api/apiRequests";
import { RootState } from "../../store";
import { fetchIssuesById } from "../../redux/actions/issuesActions";
import { fetchAllUsers } from "../../redux/actions/usersActions";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import CircularUnderLoad from "../../components/loader/circularLoader";
import AlarmAddIcon from "@material-ui/icons/AlarmAdd";
import TimerOffIcon from "@material-ui/icons/TimerOff";
import EditIcon from "@material-ui/icons/Edit";
import WorkLogGrid from "../worklog/workLogGrid";
import { toLocalTime } from "../../utils/timeUtils";
import PopupDialog from "../../components/popup/popupDialog";
type IssueDetailsProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    handleChange: any;
    fetchUsers: (request: PagedRequest) => void;
    fetchIssue: (issueId: string) => void;
    isLoading: boolean;
    errorMessage: string | undefined;
    issue: IssueDetailedModel;
  };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      maxWidth: 1800,
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
    boxSize: {
      minWidth: "500px",
      minHeight: "200px",
    },
    boxText: {
      fontSize: "16px",
      textAlign: "justify",
      justifyContent: "center",
      padding: " 0px auto",
    },
    cardHeader: {
      fontSize: "24px",
      fontWeight: "bold",
      textTransform: "uppercase",
      fontFamily: "Ubuntu",
      overflowWrap: "break-word",
    },
  })
);

type IssueRouteParams = {
  issueId: string;
};

const IssueDetailedCard: React.FC<IssueDetailsProps> = ({
  fetchIssue,
  handleChange,
  fetchUsers,
  errorMessage,
  isLoading,
  issue,
}) => {
  const location = useLocation();
  console.log("loc", location.pathname.slice(-36));
  const issueId = location.pathname.slice(-36);
  console.log("issuedId:", issueId);

  useEffect(() => {
    fetchIssue(issueId);
  }, [1]);

  const classes = useStyles();
  const setBackground = (issue?: IssueDetailedModel) => {
    switch (issue?.status ?? Status.Open) {
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
  const [openPopup, setOpenPopup] = useState(true);

  if (errorMessage) {
    <Alert severity="error">{errorMessage}</Alert>;
  }

  if (isLoading) {
    return <CircularUnderLoad />;
  } else {
    console.log("isLoading", isLoading);
    const classNameForBg = `issue_card ${setBackground(issue)}`;
    return (
      <PopupDialog title="" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <Card className={classes.root}>
          <CardContent className={classes.content}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Grid item xs={12}>
                  <Typography
                    component="h5"
                    variant="h5"
                    className={classes.cardHeader}
                  >
                    {issue.title}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <AvatarItem
                    name={issue.assignedUserFirstName}
                    surname={issue.assignedUserLastName}
                    label="Assignee"
                  />
                  <AvatarItem
                    name={issue.reportedByUserFirstName}
                    surname={issue.reportedByLastName}
                    label="Reporter"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box
                    textAlign="justify"
                    className={classNameForBg + " " + classes.boxSize}
                    m={1}
                  >
                    <Typography
                      variant="body2"
                      className={classes.boxText}
                      component="p"
                    >
                      {issue.description}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <List className={classes.root}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <EditIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Updated at"
                        secondary={toLocalTime(issue.updatedAt)}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <EditIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Status" secondary={issue.status} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <List className={classes.root}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <AlarmAddIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Opened at"
                        secondary={toLocalTime(issue.openedAt)}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <TimerOffIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Closed at"
                        secondary={toLocalTime(issue.closedAt)}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <LinearProgress
                    variant="buffer"
                    value={issue.totalSpentTimeInSeconds}
                    valueBuffer={issue.totalRemainingTimeInSeconds}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <WorkLogGrid issueId={issueId} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </PopupDialog>
    );
  }
};

const mapStateToProps = (state: RootState) => ({
  errorMessage: state.issues.error,
  isLoading: state.issues.loading,
  issue: state.issues.issue.data,
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    fetchUsers: (reguest: PagedRequest) => dispatch(fetchAllUsers(reguest)),
    fetchIssue: (issueId: string) => dispatch(fetchIssuesById(issueId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IssueDetailedCard);
