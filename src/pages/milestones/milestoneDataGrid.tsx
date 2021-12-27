import {
  CircularProgress,
  createMuiTheme,
  MuiThemeProvider,
  Typography
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import MUIDataTable, { SelectableRows } from "mui-datatables";
import React, { Dispatch, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchMilestones } from "../../redux/actions/milestonesActions";
import { RootState } from "../../store";
import { PagedRequest } from "../../types/api/apiRequests";
import { toLocalTime } from "../../utils/timeUtils";

type MilestonesDGProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    fetchPagedMilestones: (request: PagedRequest) => void;
    isLoading: boolean;
    errorMessage: string | undefined;
  };

const MilestoneDataGrid: React.FC<MilestonesDGProps> = ({
  isLoading,
  errorMessage,
  fetchPagedMilestones,
  milestones,
}) => {
  const columns = [
    {
      name: "id",
      label: "Milestone Id",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string, tableMeta: any, updateValue: any) => {
          return value.slice(0, 4);
        },
      },
    },
    {
      name: "state",
      label: "State",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "title",
      label: "Title",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "dueDate",
      label: "Due Date",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string, tableMeta: any, updateValue: any) => {
          return toLocalTime(value);
        },
      },
    },
  ];
  const [page, setPage] = useState(1);

  const getMuiTheme = () =>
    createMuiTheme({
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
    fetchPagedMilestones(request);
  }, [fetchPagedMilestones, page]);

  const options = {
    filter: true,
    selectableRows: "none" as SelectableRows,
    rowsPerPage: milestones.resultsPerPage,
    rowsPerPageOptions: [milestones.totalPages],
    serverSide: true,
    count: milestones.totalResults, //todo total count
    page,
    onTableChange: (action: string, tableState: any) => {
      console.log(action, tableState);
      if (action === "changePage") {
        console.log("Go to page", tableState.page);
        setPage(tableState.page + 1);
      }
    },
  };

  return (
    <div className="app_bar">
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={
            <Typography variant="h6">
              Milestone list
              {isLoading && (
                <CircularProgress
                  size={24}
                  style={{ marginLeft: 15, position: "relative", top: 4 }}
                />
              )}
            </Typography>
          }
          data={milestones.data}
          columns={columns}
          options={options}
        />
        {console.log(milestones.data)}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </MuiThemeProvider>
    </div>
  );
};
const mapStateToProps = (state: RootState) => ({
  errorMessage: state.milestones.error,
  isLoading: state.milestones.loading,
  milestones: state.milestones.milestones,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    fetchPagedMilestones: (request: PagedRequest) =>
      dispatch(fetchMilestones(request)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MilestoneDataGrid);
