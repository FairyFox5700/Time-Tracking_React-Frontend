import React, { Dispatch, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { IssueDetailedModel, Status } from "../../types/issues/isues";
import IssueGradientCard from "./issueCard";
import {
  ActivitiesRequest,
  UserActivityWorklogs,
} from "../../types/worklogs/worklogs";
import { fetchWorklogsByUser } from "../../redux/actions/workLogsActions";
import { connect } from "react-redux";
import { RootState } from "../../store";
import CircularUnderLoad from "../../components/loader/circularLoader";
import { ApiPagedResponse, ApiResponse } from "../../types/api/apiResponses";
import { PagedRequest } from "../../types/api/apiRequests";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    ImageList: {
      width: 500,
      height: 450,
    },
    paper: {
      textAlign: "center",
    },
    control: {
      padding: theme.spacing(2),
    },
  })
);

const initValue: Array<IssueDetailedModel> = [
  {
    issueId: "1321232-1312312-1231231-13123",
    assignedUserFirstName: "IRa",
    assignedUserLastName: "Ty",
    reportedByUserFirstName: "IRa",
    reportedByLastName: "Ty",
    updatedAt: "2012/12/21",
    openedAt: "2012/12/21",
    closedAt: "2012/12/21",
    mileStoneName: "Milestone",
    totalRemainingTimeInSeconds: 120000,
    totalSpentTimeInSeconds: 1111,
    title: "Title",
    description: "Simple desc",
    status: Status.Open,
    assignedToUserId: "1321232-1312312-1231231-13123",
    reportedByUserId: "1321232-1312312-1231231-13123",
    milestoneId: "1321232-1312312-1231231-13123",
    projectId: "1321232-1312312-1231231-13123",
  },
  {
    issueId: "1321232-1312312-1231231-13123",
    assignedUserFirstName: "IRa",
    assignedUserLastName: "Ty",
    reportedByUserFirstName: "IRa",
    reportedByLastName: "Ty",
    updatedAt: "2012/12/21",
    openedAt: "2012/12/21",
    closedAt: "2012/12/21",
    mileStoneName: "Milestone",
    totalRemainingTimeInSeconds: 120000,
    totalSpentTimeInSeconds: 1111,
    title: "Title",
    description: "Simple desc",
    status: Status.Review,
    assignedToUserId: "1321232-1312312-1231231-13123",
    reportedByUserId: "1321232-1312312-1231231-13123",
    milestoneId: "1321232-1312312-1231231-13123",
    projectId: "1321232-1312312-1231231-13123",
  },
  {
    issueId: "1321232-1312312-1231231-13123",
    assignedUserFirstName: "IRa",
    assignedUserLastName: "Ty",
    reportedByUserFirstName: "IRa",
    reportedByLastName: "Ty",
    updatedAt: "2012/12/21",
    openedAt: "2012/12/21",
    closedAt: "2012/12/21",
    mileStoneName: "Milestone",
    totalRemainingTimeInSeconds: 120000,
    totalSpentTimeInSeconds: 1111,
    title: "Title",
    description: "Simple desc",
    status: Status.Closed,
    assignedToUserId: "1321232-1312312-1231231-13123",
    reportedByUserId: "1321232-1312312-1231231-13123",
    milestoneId: "1321232-1312312-1231231-13123",
    projectId: "1321232-1312312-1231231-13123",
  },
  {
    issueId: "1321232-1312312-1231231-13123",
    assignedUserFirstName: "IRa",
    assignedUserLastName: "Ty",
    reportedByUserFirstName: "IRa",
    reportedByLastName: "Ty",
    updatedAt: "2012/12/21",
    openedAt: "2012/12/21",
    closedAt: "2012/12/21",
    mileStoneName: "Milestone",
    totalRemainingTimeInSeconds: 120000,
    totalSpentTimeInSeconds: 1111,
    title: "Title",
    description: "Simple desc",
    status: undefined,
    assignedToUserId: "1321232-1312312-1231231-13123",
    reportedByUserId: "1321232-1312312-1231231-13123",
    milestoneId: "1321232-1312312-1231231-13123",
    projectId: "1321232-1312312-1231231-13123",
  },
];

type UserIssueProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    fetchUserActivities: (request: ActivitiesRequest) => void;
    isLoading: boolean;
    errorMessage: string | undefined;
    issues: ApiPagedResponse<IssueDetailedModel>;
  };

const IssuesGrid: React.FC<UserIssueProps> = ({
  fetchUserActivities,
  isLoading,
  errorMessage,
  issues,
}) => {
  const classes = useStyles();
  useEffect(() => {
    const request: PagedRequest = {
      page: 0,
      pageSize: 1000,
    };
    // fetchUserActivities(request);
  });
  return isLoading ? (
    <CircularUnderLoad />
  ) : (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {issues.data.map((value) => (
          <Grid item xs={6} sm={6} md={3} key={value.issueId}>
            <Paper className={classes.paper}>
              <IssueGradientCard issue={value}></IssueGradientCard>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
const mapStateToProps = (state: RootState) => ({
  errorMessage: state.issues.error,
  isLoading: state.users.loading,
  worlogs: state.worklogs.workLogs,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    fetchUserActivities: (reguest: ActivitiesRequest) =>
      dispatch(fetchWorklogsByUser(reguest)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuesGrid);
