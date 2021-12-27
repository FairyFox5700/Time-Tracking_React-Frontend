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
import { fetchAllUsers } from "../../redux/actions/usersActions";
import { RootState } from "../../store";
import { PagedRequest } from "../../types/api/apiRequests";

type AppUserDGProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    fetchPagesAppUsers: (request: PagedRequest) => void;
    isLoading: boolean;
    errorMessage: string | undefined;
  };

const AppUserDataGrid: React.FC<AppUserDGProps> = ({
  isLoading,
  errorMessage,
  fetchPagesAppUsers,
  users,
}) => {
  const columns = [
    {
      name: "userId",
      label: "User Id",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "firstName",
      label: "First Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "lastName",
      label: "Last Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      //add user to tteam
      name: "teamId",
      label: "Team Id",
      options: {
        filter: true,
        sort: true,
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
    fetchPagesAppUsers(request);
  }, [fetchPagesAppUsers, page]);

  const options = {
    filter: true,
    selectableRows: "none" as SelectableRows,
    rowsPerPage: users.resultsPerPage,
    rowsPerPageOptions: [users.totalPages],
    serverSide: true,
    count: users.totalResults,
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
    <div>
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
          data={users.data}
          columns={columns}
          options={options}
        />
        {console.log(users.data)}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </MuiThemeProvider>
    </div>
  );
};
const mapStateToProps = (state: RootState) => ({
  errorMessage: state.users.error,
  isLoading: state.users.loading,
  users: state.users.users,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    fetchPagesAppUsers: (request: PagedRequest) =>
      dispatch(fetchAllUsers(request)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppUserDataGrid);
