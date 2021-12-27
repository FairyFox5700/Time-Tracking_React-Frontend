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
import { fetchAllUsers } from "../../redux/actions/userAccountsActions";
import { RootState } from "../../store";

type AppUserAccountDGProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    fetchPagesAppUserAccounts: () => void;
    isLoading: boolean;
    errorMessage: string | undefined;
  };

const AppUserAccountDGTable: React.FC<AppUserAccountDGProps> = ({
  isLoading,
  errorMessage,
  fetchPagesAppUserAccounts,
  users,
}) => {
  const columns = [
    {
      name: "id",
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
    fetchPagesAppUserAccounts();
  }, [fetchPagesAppUserAccounts, isLoading]);

  const options = {
    filter: true,
    selectableRows: "none" as SelectableRows,
  };

  return (
    <div>
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={
            <Typography variant="h6">
              User Accounts list
              {isLoading && (
                <CircularProgress
                  size={24}
                  style={{ marginLeft: 15, position: "relative", top: 4 }}
                />
              )}
            </Typography>
          }
          data={users?.data ?? []}
          columns={columns}
          options={options}
        />
        {console.log(users?.data)}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </MuiThemeProvider>
    </div>
  );
};
const mapStateToProps = (state: RootState) => ({
  errorMessage: state.userAccounts.error,
  isLoading: state.userAccounts.loading,
  users: state.userAccounts.users,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    fetchPagesAppUserAccounts: () => dispatch(fetchAllUsers()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppUserAccountDGTable);
