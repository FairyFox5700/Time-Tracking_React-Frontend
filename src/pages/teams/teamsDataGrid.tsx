import MUIDataTable, { SelectableRows } from "mui-datatables";
import React, { Dispatch, useEffect, useState } from "react";
import { Alert } from "@material-ui/lab";
import { connect } from "react-redux";
import { fetchAllTeams } from "../../redux/actions/teamsActions";
import { RootState } from "../../store";
import { PagedRequest } from "../../types/api/apiRequests";
import {
  CircularProgress,
  createTheme,
  MuiThemeProvider,
  Typography,
} from "@material-ui/core";

type TeamDGProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    fetchPagedTeams: (request: PagedRequest) => void;
    isLoading: boolean;
    errorMessage: string | undefined;
  };

const TeamDataGrid: React.FC<TeamDGProps> = ({
  isLoading,
  errorMessage,
  fetchPagedTeams,
  teams,
}) => {
  const columns = [
    {
      name: "teamId",
      label: "Team Id",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string, tableMeta: any, updateValue: any) => {
          return value.slice(0, 4);
        },
      },
    },
    {
      name: "name",
      label: "Team Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "membersCount",
      label: "Memebers count",
      options: {
        filter: true,
        sort: true,
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
    fetchPagedTeams(request);
  }, [fetchPagedTeams, page]);

  const options = {
    filter: true,
    selectableRows: "none" as SelectableRows,
    rowsPerPage: 8,
    rowsPerPageOptions: [5],
    serverSide: true,
    count: -1,
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
              Teams list
              {isLoading && (
                <CircularProgress
                  size={24}
                  style={{ marginLeft: 15, position: "relative", top: 4 }}
                />
              )}
            </Typography>
          }
          data={teams.data}
          columns={columns}
          options={options}
        />
        {console.log(teams.data)}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </MuiThemeProvider>
    </div>
  );
};
const mapStateToProps = (state: RootState) => ({
  errorMessage: state.teams.error,
  isLoading: state.teams.loading,
  teams: state.teams.teams,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    fetchPagedTeams: (request: PagedRequest) =>
      dispatch(fetchAllTeams(request)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamDataGrid);
