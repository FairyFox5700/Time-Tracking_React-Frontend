import MUIDataTable, { SelectableRows } from "mui-datatables";
import React, { Dispatch, useEffect, useState } from "react";
import { Alert } from "@material-ui/lab";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { PagedRequest } from "../../types/api/apiRequests";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  Checkbox,
  CircularProgress,
  createTheme,
  MuiThemeProvider,
  Switch,
  Typography,
} from "@material-ui/core";
import { fetchAllUsers } from "../../redux/actions/userAccountsActions";
import {
  UpdateWorkLogStatusRequest,
  WorkLogDetails,
  WorkLogModel,
} from "../../types/worklogs/worklogs";
import {
  fetchAllWorkLogs,
  updateStatusWorklog,
} from "../../redux/actions/workLogsActions";
import { ApiPagedResponse, ApiResponse } from "../../types/api/apiResponses";
import AproveWorklogPopper from "./approveWorklogPopper";
import { toLocalTime } from "../../utils/timeUtils";
type WorkLogDataGridProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    fetchWorkLogs?: (request: PagedRequest) => void;
    isLoading: boolean;
    errorMessage: string | undefined;
    worklogs: ApiPagedResponse<WorkLogDetails>;
    worklog: ApiResponse<WorkLogModel> | undefined;
    userId?: string | null;
  };

const WorkLogDataGrid: React.FC<WorkLogDataGridProps> = ({
  isLoading,
  errorMessage,
  fetchWorkLogs,
  worklogs,
  userId,
  worklog,
}) => {
  const columns = [
    {
      name: "description",
      label: "Description",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "timeSpent",
      label: "Time Spent",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "activityType",
      label: "ActivityType",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "startDate",
      label: "Start Date",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string, tableMeta: any, updateValue: any) => {
          return toLocalTime(value);
        },
      },
    },
    {
      name: "issueId",
      label: "Issue",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "isApproved",
      label: "Approved",
      options: {
        filter: false,
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          let selectedWorklog: WorkLogDetails = worklogs.data[
            tableMeta.rowIndex
          ] as WorkLogDetails;
          return (
            <AproveWorklogPopper
              worklogId={selectedWorklog.workLogId}
              isApproved={value}
            />
          );
        },
      },
    },
  ];
  const [page, setPage] = useState(1);

  const getMuiTheme = () =>
    createTheme({
      overrides: {
        MUIDataTable: {
          paper: {
            boxShadow: "none",
          },
        },
        MUIDataTableBodyRow: {
          root: {
            "&:nth-of-type(odd)": {
              backgroundColor: "#E6E6FA",
            },
          },
        },
      },
    });

  useEffect(() => {
    const request: PagedRequest = {
      page: page,
      pageSize: 8,
    };
    fetchWorkLogs(request);
  }, [worklog, page]);

  const options = {
    filter: true,
    rowsPerPage: worklogs.resultsPerPage,
    rowsPerPageOptions: [worklogs.totalPages],
    selectableRows: "none" as SelectableRows,
    serverSide: true,
    count: worklogs.totalResults, //todo total count
    page,
    onTableChange: (action: string, tableState: any) => {
      console.log(action, tableState);
      if (action === "changePage") {
        console.log("Go to page", tableState.page);
        setPage(tableState.page + 1);
      }
    },
  };

  const filteredWorklogs = () => {
    if (userId && worklogs?.data) {
      return worklogs.data.filter((e) => e.userId === userId);
    } else {
      return worklogs.data;
    }
  };

  return (
    <div className="app_bar">
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={
            <Typography variant="h6">
              User Worklog list
              {isLoading && (
                <CircularProgress
                  size={24}
                  style={{ marginLeft: 15, position: "relative", top: 4 }}
                />
              )}
            </Typography>
          }
          data={filteredWorklogs()}
          columns={columns}
          options={options}
        />
        {console.log(filteredWorklogs())}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </MuiThemeProvider>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  errorMessage: state.worklogs.error,
  isLoading: state.worklogs.loading,
  worklogs: state.worklogs.workLogs,
  worklog: state.worklogs.workLog,
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    fetchWorkLogs: (reguest: PagedRequest) =>
      dispatch(fetchAllWorkLogs(reguest)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkLogDataGrid);
