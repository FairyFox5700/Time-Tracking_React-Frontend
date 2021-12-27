import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import { Form, Formik, FormikProps } from "formik";
import React, { Dispatch } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import SubmitButton from "../../components/controls/submitButton";
import TextInput from "../../components/controls/textInput";
import { updateStatusWorklog } from "../../redux/actions/workLogsActions";
import {
  ActivityType,
  UpdateWorkLogStatusRequest,
  WorkLogModel
} from "../../types/worklogs/worklogs";

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

type WorklogDescriptionFormProps = ReturnType<typeof mapDispatchToProps> & {
  handleChange?: any;
  worklogId: string;
  isApproved: boolean;
  approveWorklog?: (request: UpdateWorkLogStatusRequest) => void;
};

const WorklogDescriptionForm: React.FC<WorklogDescriptionFormProps> = ({
  handleChange,
  worklogId,
  isApproved,
  approveWorklog,
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
    const request: UpdateWorkLogStatusRequest = {
      isApproved: false,
      workLogId: worklogId,
      description: values.description,
    };
    if (request.isApproved) {
      return;
    } else {
      approveWorklog(request);
    }
  };

  const classes = useStyles();
  return (
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
              <Grid container justify="space-around" direction="row">
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
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <SubmitButton
                    children={"Submit"}
                    onClick={() => onSubmit}
                    disabled={false}
                  ></SubmitButton>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    approveWorklog: (request: UpdateWorkLogStatusRequest) =>
      dispatch(updateStatusWorklog(request)),
  };
};

export default connect(null, mapDispatchToProps)(WorklogDescriptionForm);
