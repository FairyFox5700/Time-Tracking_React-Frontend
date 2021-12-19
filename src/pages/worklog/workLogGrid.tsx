import React, { Dispatch, useEffect } from "react";
import { GridList } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { PagedRequest } from "../../types/api/apiRequests";
import { RootState } from "../../store";
import { connect } from "react-redux";
import { Alert } from "@material-ui/lab";
import CircularUnderLoad from "../../components/loader/circularLoader";
import { WorkLogDetails } from "../../types/worklogs/worklogs";
import { fetchAllWorkLogs } from "../../redux/actions/workLogsActions";
import WorkLogCard from "./workLogCard";

type WorkLogGridProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    fetchWorkLogs?: (request: PagedRequest) => void;
    isLoading: boolean;
    errorMessage: string | undefined;
    worklogs: WorkLogDetails[];
    userId?: string | null;
    issueId?: string;
  };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      flexDirection: "column",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 300,
      height: 450,
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
  })
);

const WorkLogGrid: React.FC<WorkLogGridProps> = ({
  fetchWorkLogs,
  errorMessage,
  worklogs,
  isLoading,
  issueId,
  userId,
}) => {
  useEffect(() => {
    const request: PagedRequest = {
      page: 0,
      pageSize: 1000,
    };
    fetchWorkLogs(request);
  }, [1]);

  const filteredWorklogs = () => {
    console.log("worklogs");
    if (issueId != null) {
      console.log("worklogs", issueId);
      return worklogs?.filter((e) => e.issueId === issueId);
    }
    if (userId && worklogs) {
      return worklogs.filter((e) => e.userId === userId);
    } else {
      return worklogs;
    }
  };
  const classes = useStyles();
  if (errorMessage) {
    <Alert severity="error">{errorMessage}</Alert>;
  }
  if (isLoading) {
    return <CircularUnderLoad />;
  } else {
    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          {filteredWorklogs().map((tile) => (
            <WorkLogCard workLog={tile} />
          ))}
        </GridList>
      </div>
    );
  }
};

const mapStateToProps = (state: RootState) => ({
  errorMessage: state.issues.error,
  isLoading: state.issues.loading,
  worklogs: state.worklogs.workLogs?.data ?? [],
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    fetchWorkLogs: (reguest: PagedRequest) =>
      dispatch(fetchAllWorkLogs(reguest)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkLogGrid);
