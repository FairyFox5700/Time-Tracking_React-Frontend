import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Form, Formik, FormikProps } from "formik";
import React, { Dispatch, useEffect, useState } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import DatePickerInput from "../../components/controls/datePickerInput";
import FormHeader from "../../components/controls/formHeader";
import SelectInput from "../../components/controls/selectInput";
import SubmitButton from "../../components/controls/submitButton";
import CircularUnderLoad from "../../components/loader/circularLoader";
import { fetchProjects } from "../../redux/actions/projectsActions";
import { generateReport } from "../../redux/actions/reportsActions";
import { RootState } from "../../store";
import { PagedRequest } from "../../types/api/apiRequests";
import {
  ProjectDetailsModel
} from "../../types/projects/project";
import {
  ReportFormatType,
  ReportGenerationRequest,
  ReportType
} from "../../types/report/report";
import { ToArray } from "../../utils/enumUtils";
import { getUserId } from "../../utils/jwtUtils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "450px",
      display: "block",
      margin: "10% auto",
      background: "white",
      borderRadius: "30px",
      "& .Mui-error": {
        color: "#986c6a",
      },
      "& .MuiContainer-root": {
        marginTop: "30px",
      },
      "& .Mui-sucess": {
        color: "#74c69d",
      },
      "& .MuiGrid-root": {
        marginBottom: "8px",
      },
    },
    textBottom: {
      textAlign: "center",
      margin: "8px",
      fontSize: "14px",
      color: "#707981",
    },
  })
);

type ReportsProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    isLoading: boolean;
    errorMessage: string | undefined;
    generateReport: (request: ReportGenerationRequest) => void;
    fetchProjects: (request: PagedRequest) => void;
    report: any;
  };

const ReportForm: React.FC<ReportsProps> = ({
  isLoading,
  errorMessage,
  generateReport,
  fetchProjects,
  projects,
  report,
}) => {
  const classes = useStyles();

  const initialValues: ReportGenerationRequest = {
    reportFormatType: ReportFormatType.Excel,
    reportType: ReportType.ActivitiesReport,
    fromDate: new Date(),
    toDate: new Date(),
    userId: "",
    projectId: "",
  };

  const uuidRegex =
    "/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i";

  const validationSchema = Yup.object().shape({
    fromDate: Yup.date().required("Please provide valid start date"),
    toDate: Yup.date().required("Please provide valid end data"),
  });

  useEffect(() => {
    const request: PagedRequest = {
      page: 0,
      pageSize: 1000,
    };
    fetchProjects(request);
  }, [isLoading]);

  const setFormat = (format: string) => {
    if (format === "Pdf") {
      return "application/pdf";
    } else {
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    }
  };
  const [reportFormat, setReportFormat] = useState("");
  useEffect(() => {
    if (report) {
      const blob = new Blob([report], {
        type: setFormat(reportFormat),
      });
      console.log(blob);
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;

      document.body.appendChild(a);
      a.click();
    }
  }, [report]);
  const onSubmit = (values: ReportGenerationRequest, actions: any) => {
    values.userId = getUserId();
    console.log("generateReport", values);
    generateReport(values);
    setReportFormat(values.reportFormatType.toString());

    actions.resetForm();
    actions.setSubmitting(false);
  };

  return isLoading ? (
    <CircularUnderLoad />
  ) : (
    <Grid className={classes.root}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(props: FormikProps<ReportGenerationRequest>) => {
          const { values, handleBlur, handleChange, isSubmitting } = props;
          return (
            <Form>
              <FormHeader children="GENERATE ACTIVITIES REPORT" />
              <Grid container justify="space-around" direction="row">
                <Grid item xs={10}>
                  <SelectInput
                    name="reportFormatType"
                    label="Slect format type"
                    value={values.reportFormatType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={ToArray(ReportFormatType)}
                    error={false}
                  ></SelectInput>
                </Grid>
                <Grid item xs={10}>
                  <SelectInput
                    name="projectId"
                    label="Select project"
                    value={values.projectId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    selectorDisplay={(pr: ProjectDetailsModel) =>
                      pr.abbreviation
                    }
                    selectorValue={(pr: ProjectDetailsModel) => pr.projectId}
                    options={projects.data}
                    error={false}
                  ></SelectInput>
                </Grid>
                <Grid item xs={10}>
                  <SelectInput
                    name="reportType"
                    label="Select report type"
                    value={values.reportType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={ToArray(ReportType)}
                    error={false}
                  ></SelectInput>
                </Grid>
                <Grid item xs={10}>
                  <DatePickerInput
                    name="fromDate"
                    label="From Date"
                    value={values.fromDate}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={10}>
                  <DatePickerInput
                    name="toDate"
                    label="To Date"
                    value={values.toDate}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <SubmitButton
                    children={isLoading ? "Loading" : "Download file"}
                    onClick={() => onSubmit}
                    disabled={isLoading}
                  ></SubmitButton>
                </Grid>
                {errorMessage && (
                  <Grid item lg={10} md={10} sm={10} xs={10}>
                    <Alert severity="error">{errorMessage}</Alert>
                  </Grid>
                )}
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Grid>
  );
};

const mapStateToProps = (state: RootState) => ({
  errorMessage: state.reports.error,
  isLoading: state.reports.loading && state.projects.loading,
  projects: state.projects.projects,
  report: state.reports.response,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    fetchProjects: (request: PagedRequest) => dispatch(fetchProjects(request)),
    generateReport: (request: ReportGenerationRequest) =>
      dispatch(generateReport(request)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);
