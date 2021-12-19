import React, { Dispatch, useEffect, useState } from "react";
import { Grid, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Formik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import SubmitButton from "../../components/controls/submitButton";
import TextInput from "../../components/controls/textInput";
import FormHeader from "../../components/controls/formHeader";
import { State, MilestonModel } from "../../types/milestones/milestones";
import AutoCompleteInput from "../../components/controls/autoCompeteInput";
import DatePickerInput from "../../components/controls/datePickerInput";
import { addMilestone } from "../../redux/actions/milestonesActions";
import { RootState } from "../../store";
import { connect } from "react-redux";
import CircularUnderLoad from "../../components/loader/circularLoader";
import { Alert } from "@material-ui/lab";
import { PagedRequest } from "../../types/api/apiRequests";
import { fetchProjects } from "../../redux/actions/projectsActions";
import {
  ProjectDetailsModel,
  ProjectModel,
} from "../../types/projects/project";
import TextInputMultiline from "../../components/controls/textFieldMultiline";
import SelectInput from "../../components/controls/selectInput";
import { useHistory } from "react-router-dom";

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

type MilestoneProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    handleChange: any;
    createMilestone: (model: MilestonModel) => void;
    fetchProjects: (request: PagedRequest) => void;
    isLoading: boolean;
    errorMessage: string | undefined;
  };

const MilestoneForm: React.FC<MilestoneProps> = ({
  handleChange,
  createMilestone,
  errorMessage,
  isLoading,
  fetchProjects,
  projects,
}) => {
  const classes = useStyles();

  const initialValues: MilestonModel = {
    state: State.Closed,
    title: "",
    description: "",
    dueDate: new Date(),
    projectId: "",
  };

  const uuidRegex =
    "/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i";

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(6, "Minimum 6 characters required")
      .required("Please provide valid tittle"),
    description: Yup.string()
      .min(14, "description must be at least 14 characters")
      .max(50, "description must be less then 50 characters")
      .required("Please provide valid description"),
    dueDate: Yup.date().required("Please provide valid due date"),
    state: Yup.string().required("Please provide milestone status"),
    projectId: Yup.string().required("Please provide project"),
  });

  const history = useHistory();
  const onSubmit = (values: MilestonModel, actions: any) => {
    console.log({ values, actions });
    createMilestone(values);
    actions.resetForm();
    actions.setSubmitting(false);
    setTimeout(() => {
      if (!errorMessage) {
        history.push("/milestones");
      }
    }, 35000);
  };

  useEffect(() => {
    const request: PagedRequest = {
      page: 0,
      pageSize: 1000,
    };
    fetchProjects(request);
  }, [isLoading]);

  return isLoading ? (
    <CircularUnderLoad />
  ) : (
    <Grid className={classes.root}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(props: FormikProps<MilestonModel>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
          } = props;
          return (
            <Form>
              <FormHeader children="Create milestone" />
              <Grid container justify="space-around" direction="row">
                <TextInput
                  name="title"
                  id="title"
                  label="Title"
                  value={values.title}
                  type="title"
                  helperText={
                    errors.title && touched.title ? errors.title : "Enter title"
                  }
                  error={errors.title && touched.title ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextInputMultiline
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
                <SelectInput
                  name="projectId"
                  label="Select project"
                  value={values.projectId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  selectorDisplay={(pr: ProjectModel) => pr.name}
                  selectorValue={(pr: ProjectDetailsModel) => pr.projectId}
                  error={errors.projectId && touched.projectId ? true : false}
                  options={projects.data}
                ></SelectInput>
                <Grid item xs={10}>
                  <DatePickerInput
                    name="dueDate"
                    label="Due Date"
                    value={values.dueDate}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <SubmitButton
                    children={isLoading ? "Loading" : "Create milestone"}
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
  isLoading: state.milestones.loading && state.projects.loading,
  projects: state.projects.projects,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    createMilestone: (model: MilestonModel) => dispatch(addMilestone(model)),
    fetchProjects: (request: PagedRequest) => dispatch(fetchProjects(request)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MilestoneForm);
