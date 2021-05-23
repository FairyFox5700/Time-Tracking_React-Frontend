import React, { Dispatch, useEffect } from "react";
import { Grid, makeStyles, Theme, createStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Formik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import { ProjectModel } from "../../types/projects/project";
import { RootState } from "../../store";
import SubmitButton from "../../components/controls/submitButton";
import { Alert } from "@material-ui/lab";
import { addProject } from "../../redux/actions/projectsActions";
import { connect } from "react-redux";
import TextInput from "../../components/controls/textInput";
import DatePickerInput from "../../components/controls/datePickerInput";
import CircularUnderLoad from "../../components/loader/circularLoader";
import FormHeader from "../../components/controls/formHeader";

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

type ProjectProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    handleChange: any;
    createProject: (model: ProjectModel) => void;
    isLoading: boolean;
    errorMessage: string | undefined;
  };

const ProjectForm: React.FC<ProjectProps> = ({
  isLoading,
  errorMessage,
  handleChange,
  createProject,
}) => {
  const history = useHistory();
  const initialValues: ProjectModel = {
    name: "",
    abbreviation: "",
    description: "",
    initialRisk: new Date(),
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(6, "Minimum 6 characters required")
      .required("Please provide valid name"),
    description: Yup.string()
      .min(14, "Description must be at least 14 characters")
      .required("Please provide valid description"),
    abbreviation: Yup.string()
      .min(2, "Abbreviation must be at least 14 characters")
      .required("Please provide valid abbreviation"),
  });

  const onSubmit = (values: ProjectModel, actions: any) => {
    console.log({ values, actions });
    actions.resetForm();
    actions.setSubmitting(false);
    createProject(values);
    setTimeout(() => {
      if (!errorMessage) {
        history.push("/projects");
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
        {(props: FormikProps<ProjectModel>) => {
          const { values, touched, errors, handleBlur, handleChange } = props;
          return (
            <Form>
              <FormHeader children="Create project" />
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
                  name="abbreviation"
                  id="abbreviation"
                  label="Abbreviation"
                  value={values.abbreviation}
                  type="abbreviation"
                  helperText={
                    errors.abbreviation && touched.abbreviation
                      ? errors.abbreviation
                      : "Enter abbreviation"
                  }
                  error={
                    errors.abbreviation && touched.abbreviation ? true : false
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Grid item xs={10}>
                  <DatePickerInput
                    name="initialRisk"
                    label="Initial Risk"
                    value={values.initialRisk}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <SubmitButton
                    children={isLoading ? "Loading" : "Create project"}
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
  errorMessage: state.projects.error,
  isLoading: state.projects.loading,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    createProject: (model: ProjectModel) => dispatch(addProject(model)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
