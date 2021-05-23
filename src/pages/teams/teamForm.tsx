import React, { Dispatch, useEffect, useState } from "react";
import { Grid, makeStyles, Theme, createStyles } from "@material-ui/core";
import { Formik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import { TeamModel } from "../../types/teams/teams";
import { Alert } from "@material-ui/lab";
import { connect } from "react-redux";
import TextInput from "../../components/controls/textInput";
import CircularUnderLoad from "../../components/loader/circularLoader";
import FormHeader from "../../components/controls/formHeader";
import SubmitButton from "../../components/controls/submitButton";
import { addTeam } from "../../redux/actions/teamsActions";
import { RootState } from "../../store";
import {
  ProjectDetailsModel,
  ProjectModel,
} from "../../types/projects/project";
import { PagedRequest } from "../../types/api/apiRequests";
import AutoCompleteInput from "../../components/controls/autoCompeteInput";
import { fetchProjects } from "../../redux/actions/projectsActions";
import SelectInput from "../../components/controls/selectInput";
import { useHistory } from "react-router";

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

type TeamProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    handleChange: any;
    createTeam: (model: TeamModel) => void;
    isLoading: boolean;
    errorMessage: string | undefined;
    fetchProjects: (request: PagedRequest) => void;
  };

const TeamForm: React.FC<TeamProps> = ({
  handleChange,
  createTeam,
  isLoading,
  errorMessage,
  fetchProjects,
  projects,
}) => {
  const initialValues: TeamModel = {
    name: "",
    membersCount: 0,
    projectId: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(6, "Minimum 6 characters required")
      .required("Please provide valid name"),
    membersCount: Yup.number()
      .min(1, "Members Count must be at more then 1")
      .max(100, "Members Count must be at more then 100")
      .required("Please provide valid memener count"),
  });

  useEffect(() => {
    const request: PagedRequest = {
      page: 0,
      pageSize: 1000,
    };
    fetchProjects(request);
  }, [isLoading]);

  const history = useHistory();
  const onSubmit = (values: TeamModel, actions: any) => {
    console.log({ values, actions });
    createTeam(values);
    actions.resetForm();
    actions.setSubmitting(false);
    setTimeout(() => {
      if (!errorMessage) {
        history.push("/teams");
      }
    }, 5000);
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
        {(props: FormikProps<TeamModel>) => {
          const { values, touched, errors, handleBlur, handleChange } = props;
          return (
            <Form>
              <FormHeader children="Create team" />
              <Grid container justify="space-around" direction="row">
                <TextInput
                  name="name"
                  id="name"
                  label="Name"
                  value={values.name}
                  type="name"
                  helperText={
                    errors.name && touched.name ? errors.name : "Enter name"
                  }
                  error={errors.name && touched.name ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <TextInput
                  name="membersCount"
                  id="membersCount"
                  label="Members Count"
                  value={values.membersCount}
                  type="number"
                  helperText={
                    errors.membersCount && touched.membersCount
                      ? errors.membersCount
                      : "Enter members count"
                  }
                  error={
                    errors.membersCount && touched.membersCount ? true : false
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
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <SubmitButton
                    children={isLoading ? "Loading" : "Create team"}
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
  errorMessage: state.teams.error,
  isLoading: state.teams.loading,
  projects: state.projects.projects,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    createTeam: (model: TeamModel) => dispatch(addTeam(model)),
    fetchProjects: (request: PagedRequest) => dispatch(fetchProjects(request)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamForm);
