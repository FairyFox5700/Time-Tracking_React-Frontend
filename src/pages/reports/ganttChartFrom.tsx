import React, { Dispatch, useEffect } from "react";
import { Grid, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Formik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import FormHeader from "../../components/controls/formHeader";
import DatePickerInput from "../../components/controls/datePickerInput";
import SelectInput from "../../components/controls/selectInput";
import SubmitButton from "../../components/controls/submitButton";
import { Alert } from "@material-ui/lab";
import CircularUnderLoad from "../../components/loader/circularLoader";
import { PagedRequest } from "../../types/api/apiRequests";
import { RootState } from "../../store";
import { MilestoneDetailsModel } from "../../types/milestones/milestones";
import { IssueFilteringRequest } from "../../types/issues/isues";
import { fetchMilestones } from "../../redux/actions/milestonesActions";
import { fetchIssuesFiltered } from "../../redux/actions/issuesActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "2400px",
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

type GanttReportsProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    isLoading: boolean;
    errorMessage: string | undefined;
    fetchIssueDataFiltered: (request: IssueFilteringRequest) => void;
    fetchPagedMilestones : (request:PagedRequest) =>void;
  };

const GanttReportForm: React.FC<GanttReportsProps> = ({
  isLoading,
  errorMessage,
  milestones,
  issues,
  fetchPagedMilestones,
  fetchIssueDataFiltered,
}) => {
  const classes = useStyles();

  const initialValues: IssueFilteringRequest = {
    milestoneId: "c525d106-0be8-4c20-962e-4262224e2f97",
    startDate: new Date(2018,10,10).toISOString(),
    endDate: new Date().toISOString(),
  };

  const validationSchema = Yup.object().shape({
    startDate: Yup.date().required("Please provide valid start date"),
    endDate: Yup.date().required("Please provide valid end data"),
  });

  useEffect(() => {
    const request: PagedRequest = {
      page: 0,
      pageSize: 100,
    };
    console.log("Milestones");
    fetchPagedMilestones(request);
  }, [1]);

  const onSubmit = (values: IssueFilteringRequest, actions: any) => {
        let request = {...values,
            endDate:new Date(values.endDate).toISOString(),
            startDate:new Date(values.startDate).toISOString()};
        console.log("values:"+request);
        fetchIssueDataFiltered(request);
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
        {(props: FormikProps<IssueFilteringRequest>) => {
          const { values, handleBlur, handleChange, isSubmitting } = props;
          return (
            <Form>
              <FormHeader children="GENERATE GANTT CHART" />
              <Grid container justify="space-around" direction="row">
                <Grid item xs={10}>
                  <SelectInput
                    name="milestoneId"
                    label="Select milestone"
                    value={values.milestoneId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    selectorDisplay={(md: MilestoneDetailsModel) =>
                      md.title
                    }
                    selectorValue={(md: MilestoneDetailsModel) => md.id}
                    options={milestones.data}
                    error={false}
                  ></SelectInput>
                </Grid>
                <Grid item xs={10}>
                  <DatePickerInput
                    name="startDate"
                    label="Start Date"
                    value={values.startDate}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={10}>
                  <DatePickerInput
                    name="endDate"
                    label="End Date"
                    value={values.endDate}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <SubmitButton
                    children={isLoading ? "Loading" : "Generate chart"}
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
  errorMessage: state.milestones.error,
  isLoading:  state.milestones.loading,
  milestones: state.milestones.milestones,
  issues: state.issues.issues,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    fetchPagedMilestones: (request: PagedRequest) => dispatch(fetchMilestones(request)),
    fetchIssueDataFiltered: (request: IssueFilteringRequest) =>
      dispatch(fetchIssuesFiltered(request)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GanttReportForm);
