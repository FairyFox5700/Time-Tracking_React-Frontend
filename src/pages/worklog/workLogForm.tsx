import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Form, Formik, FormikProps } from "formik";
import React, { Dispatch } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import DatePickerInput from "../../components/controls/datePickerInput";
import FormHeader from "../../components/controls/formHeader";
import SubmitButton from "../../components/controls/submitButton";
import TextInput from "../../components/controls/textInput";
import CircularUnderLoad from "../../components/loader/circularLoader";
import { createWorklog } from "../../redux/actions/workLogsActions";
import { RootState } from "../../store";
import { ActivityType, WorkLogModel } from "../../types/worklogs/worklogs";

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
      "& .Mui-sucess": {
        color: "#74c69d",
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

type WorklogFormProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    handleChange: any;
    createWorklog: (model: WorkLogModel) => void;
    isLoading: boolean;
    errorMessage: string | undefined;
  };

const WorklogForm: React.FC<WorklogFormProps> = ({
  isLoading,
  errorMessage,
  handleChange,
  createWorklog,
}) => {
  const initialValues: WorkLogModel = {
    description: "",
    timeSpent: "",
    activityType: ActivityType.Coding,
    startDate: new Date(),
    issueId: "",
  };

  const validationSchema = Yup.object().shape({
    description: Yup.string()
      .min(14, "Description must be at least 14 characters")
      .required("Please provide valid description"),
  });

  const onSubmit = (values: WorkLogModel, actions: any) => {
    console.log({ values, actions });
    actions.resetForm();
    actions.setSubmitting(false);
    createWorklog(values);
  };

  const classes = useStyles();
  return isLoading ? (
    <CircularUnderLoad />
  ) : (
    <Grid className={classes.root}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(props: FormikProps<WorkLogModel>) => {
          const { values, touched, errors, handleBlur, handleChange } = props;
          return (
            <Form>
              <FormHeader children="Create worklog" />
              <Grid container justify="space-around" direction="row">
                <TextInput
                  name="activityType"
                  id="activityType"
                  label="Activity Type"
                  value={values.activityType}
                  type="activityType"
                  helperText={
                    errors.activityType && touched.activityType
                      ? errors.activityType
                      : "Enter activity type"
                  }
                  error={
                    errors.activityType && touched.activityType ? true : false
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextInput
                  name="description"
                  id="description"
                  label="Description"
                  value={values.description}
                  type="description"
                  helperText={
                    errors.description && touched.description
                      ? errors.description
                      : "Enter description"
                  }
                  error={
                    errors.description && touched.description ? true : false
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextInput
                  name="issueId"
                  id="issueId"
                  label="Issue Id"
                  value={values.issueId}
                  type="issueId"
                  helperText={
                    errors.issueId && touched.issueId
                      ? errors.issueId
                      : "Enter issueId"
                  }
                  error={errors.issueId && touched.issueId ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Grid item xs={10}>
                  <DatePickerInput
                    name="timeSpent"
                    label="Time spent"
                    value={values.timeSpent}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={10}>
                  <DatePickerInput
                    name="startDate"
                    label="Start Date"
                    value={values.timeSpent}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <SubmitButton
                    children={isLoading ? "Loading" : "Create worklog"}
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
  errorMessage: state.worklogs.error,
  isLoading: state.worklogs.loading,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    createWorklog: (model: WorkLogModel) => dispatch(createWorklog(model)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorklogForm);
