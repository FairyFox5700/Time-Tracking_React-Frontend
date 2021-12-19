import React, { Dispatch, useEffect, useState } from "react";
import { Grid, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Formik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import SubmitButton from "../../components/controls/submitButton";
import TextInput from "../../components/controls/textInput";
import FormHeader from "../../components/controls/formHeader";
import SelectInput from "../../components/controls/selectInput";
import { IssueModel, Status } from "../../types/issues/isues";
import { ToArray } from "../../utils/enumUtils";
import { fetchAllUsers } from "../../redux/actions/usersActions";
import Alert from "@material-ui/lab/Alert";
import { RootState } from "../../store";
import { connect } from "react-redux";
import { PagedRequest } from "../../types/api/apiRequests";
import { createIssue } from "../../redux/actions/issuesActions";
import { ApiPagedResponse } from "../../types/api/apiResponses";
import { UserDetailsModel } from "../../types/users/users";
import CircularUnderLoad from "../../components/loader/circularLoader";
import { Link, Redirect, useHistory } from "react-router-dom";
import { ProjectDetailsModel } from "../../types/projects/project";
import { MilestoneDetailsModel } from "../../types/milestones/milestones";
import { fetchProjects } from "../../redux/actions/projectsActions";
import { fetchMilestones } from "../../redux/actions/milestonesActions";

type IssueProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    handleChange: any;
    fetchUsers: (request: PagedRequest) => void;
    createIssue: (model: IssueModel) => void;
    fetchProjects: (request: PagedRequest) => void;
    isLoading: boolean;
    errorMessage: string | undefined;
    projects: ApiPagedResponse<ProjectDetailsModel>;
    users: ApiPagedResponse<UserDetailsModel>;
    milestones: ApiPagedResponse<MilestoneDetailsModel>;
  };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "450px",
      display: "block",
      margin: "4% auto",
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

const IssueForm: React.FC<IssueProps> = ({
  handleChange,
  fetchUsers,
  createIssue,
  errorMessage,
  isLoading,
  fetchProjects,
  fetchMilestones,
  users,
  milestones,
  projects,
}) => {
  const classes = useStyles();

  const initialValues: IssueModel = {
    title: "",
    description: "",
    status: Status.Open,
    assignedToUserId: "",
    reportedByUserId: "",
    milestoneId: "",
    projectId: "",
  };

  const [once, setOnce] = useState(true);
  useEffect(() => {
    const request: PagedRequest = {
      page: 0,
      pageSize: 1000,
    };

    if (once) {
      fetchProjects(request);
      fetchMilestones(request);
      fetchUsers(request);
      setOnce(false);
    }
  }, [once]);

  const uuidRegex =
    "/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i";

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(6, "Minimum 6 characters required")
      .max(20, "title must be less then 20 characters")
      .required("Please provide valid tittle"),
    description: Yup.string()
      .min(14, "description must be at least 14 characters")
      .max(150, "description must be less then 150 characters")
      .required("Please provide valid description"),
    assignedToUserId: Yup.string().required(
      "Please provide valid assigned useer id"
    ),
    reportedByUserId: Yup.string().required(
      "Please provide valid reporter useer id"
    ),
    milestoneId: Yup.string().required("Please provide valid milestone id"),
    projectId: Yup.string().required("Please provide valid project id"),
  });

  const history = useHistory();
  const onSubmit = (values: IssueModel, actions: any) => {
    console.log({ values, actions });
    createIssue(values);
    actions.resetForm();
    actions.setSubmitting(false);
    setTimeout(() => {
      if (!errorMessage) {
        history.push("/home");
      }
    }, 5000);
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
        {(props: FormikProps<IssueModel>) => {
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
              <FormHeader children="Create issue" />
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
                <Grid item xs={10}>
                  <SelectInput
                    name="status"
                    label="Slect status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={ToArray(Status)}
                    error={false}
                  ></SelectInput>
                </Grid>
                <SelectInput
                  name="assignedToUserId"
                  label="Select assignee"
                  value={values.assignedToUserId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  selectorDisplay={(as: UserDetailsModel) =>
                    as.firstName + " " + as.lastName
                  }
                  selectorValue={(as: UserDetailsModel) => as.userId}
                  error={
                    errors.assignedToUserId && touched.assignedToUserId
                      ? true
                      : false
                  }
                  options={users.data}
                ></SelectInput>
                {console.log("users", users.data)}
                <SelectInput
                  name="reportedByUserId"
                  label="Select reporter"
                  value={values.reportedByUserId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  selectorDisplay={(as: UserDetailsModel) =>
                    as.firstName + " " + as.lastName
                  }
                  selectorValue={(as: UserDetailsModel) => as.userId}
                  error={
                    errors.reportedByUserId && touched.reportedByUserId
                      ? true
                      : false
                  }
                  options={users.data}
                ></SelectInput>
                <SelectInput
                  name="milestoneId"
                  label="Select milestone"
                  value={values.milestoneId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  selectorDisplay={(ml: MilestoneDetailsModel) => ml.title}
                  selectorValue={(ml: MilestoneDetailsModel) => ml.id}
                  options={milestones.data}
                  error={false}
                ></SelectInput>
                <SelectInput
                  name="projectId"
                  label="Select project"
                  value={values.projectId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  selectorDisplay={(pr: ProjectDetailsModel) => pr.name}
                  selectorValue={(pr: ProjectDetailsModel) => pr.projectId}
                  options={projects.data}
                  error={false}
                ></SelectInput>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <SubmitButton
                    children={isLoading ? "Loading" : "Create issue"}
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
  errorMessage:
    state.issues.error ||
    state.projects.error ||
    state.milestones.error ||
    state.users.error,
  isLoading:
    state.issues.loading ||
    state.projects.loading ||
    state.milestones.loading ||
    state.users.loading,
  projects: state.projects.projects,
  milestones: state.milestones.milestones,
  users: state.users.users,
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    fetchUsers: (reguest: PagedRequest) => dispatch(fetchAllUsers(reguest)),
    createIssue: (model: IssueModel) => dispatch(createIssue(model)),
    fetchProjects: (request: PagedRequest) => dispatch(fetchProjects(request)),
    fetchMilestones: (request: PagedRequest) =>
      dispatch(fetchMilestones(request)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IssueForm);
