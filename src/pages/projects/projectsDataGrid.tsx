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
import { fetchProjects } from "../../redux/actions/projectsActions";
import { RootState } from "../../store";
import { PagedRequest } from "../../types/api/apiRequests";
import { toLocalTime } from "../../utils/timeUtils";

type ProjectsDGProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    fetchPagedProjects: (request: PagedRequest) => void;
    isLoading: boolean;
    errorMessage: string | undefined;
  };

const ProjectsDataGrid: React.FC<ProjectsDGProps> = ({
  isLoading,
  errorMessage,
  fetchPagedProjects,
  projects,
}) => {
  const columns = [
    {
      name: "projectId",
      label: "Project Id",
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
      label: "Project Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "abbreviation",
      label: "Abbreviation",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "initialRisk",
      label: "Initial Risk",
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
    fetchPagedProjects(request);
  }, [fetchPagedProjects, page]);

  const options = {
    filter: true,
    selectableRows: "none" as SelectableRows,
    rowsPerPage: projects.resultsPerPage,
    rowsPerPageOptions: [projects.totalPages],
    serverSide: true,
    count: projects.totalResults, //todo total count
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
              Projects list
              {isLoading && (
                <CircularProgress
                  size={24}
                  style={{ marginLeft: 15, position: "relative", top: 4 }}
                />
              )}
            </Typography>
          }
          data={projects.data}
          columns={columns}
          options={options}
        />
        {console.log(projects.data)}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </MuiThemeProvider>
    </div>
  );
};
const mapStateToProps = (state: RootState) => ({
  errorMessage: state.projects.error,
  isLoading: state.projects.loading,
  projects: state.projects.projects,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    fetchPagedProjects: (request: PagedRequest) =>
      dispatch(fetchProjects(request)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsDataGrid);
