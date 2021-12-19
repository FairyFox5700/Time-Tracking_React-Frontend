import React, { Dispatch, useEffect, useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import {
  Grid,
  Typography,
  createStyles,
  Theme,
  makeStyles,
} from "@material-ui/core";
import { Formik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import {
  EmailConfirmationRequest,
  ResendEmailConfirmationRequest,
  ResetPasswordRequest,
} from "../../types/auth/auth";
import SubmitButton from "../../components/controls/submitButton";
import TextInput from "../../components/controls/textInput";
import FormHeader from "../../components/controls/formHeader";
import {
  confirmEmail,
  handleResetPasswordFail,
  resendVerificationEmail,
  resetPassword,
} from "../../redux/actions/auth/authActions";
import Alert from "@material-ui/lab/Alert";
import { RootState } from "../../store";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";

type ResetPasswordProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    handleChange: any;
    resetPassword: (model: ResetPasswordRequest) => void;
    code: string;
    userId: string;
    isLoading: boolean;
    errorMessage: string | undefined;
  };

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
    textPrimary: {
      color: "#707981",
      fontSize: "18px",
      textAlign: "center",
      margin: "20px auto",
    },
    text: {
      color: "#707981",
      fontSize: "14px",
      textAlign: "center",
      margin: "20px auto",
    },
  })
);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword: React.FC<ResetPasswordProps> = ({
  handleChange,
  resetPassword,
  isLoading,
  errorMessage,
}) => {
  const classes = useStyles();

  const query = useQuery();

  const initialValues: ResetPasswordRequest = {
    userId: "",
    code: "",
    confirmPassword: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required(
      "Please valid password. One uppercase, one lowercase, one special character and no spaces"
    ),
    confirmPassword: Yup.string()
      .required("Required")
      .test("password-match", "Password musth match", function (value) {
        return this.parent.password === value;
      }),
  });

  const onSubmit = (values: ResetPasswordRequest, actions: any) => {
    actions.resetForm();
    actions.setSubmitting(false);
    const resetRequest: ResetPasswordRequest = {
      userId: query.get("userId"),
      code: query.get("code"),
      password: values.password,
      confirmPassword: "",
    };
    resetPassword(resetRequest);
    if (!isLoading && !errorMessage) <Redirect to="/login" />;
  };

  return (
    <Grid className={classes.root}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(props: FormikProps<ResetPasswordRequest>) => {
          const { values, touched, errors, handleBlur, handleChange } = props;
          return (
            <Form>
              <FormHeader children="Reset password" />
              <Grid container justify="space-around" direction="row">
                <Grid item lg={10} md={10} sm={10} xs={10}>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.textPrimary}
                  >
                    Forgot password confirmation link was sent to yor email
                    adress. Please check your email box.
                  </Typography>
                </Grid>
                <TextInput
                  name="password"
                  id="password"
                  label="Password"
                  value={values.password}
                  type="password"
                  helperText={
                    errors.password && touched.password
                      ? "Please valid password. One uppercase, one lowercase, one special character and no spaces"
                      : "One uppercase, one lowercase, one special character and no spaces"
                  }
                  error={errors.password && touched.password ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextInput
                  name="confirmPassword"
                  id="confirmPassword"
                  label="Confirm password"
                  value={values.confirmPassword}
                  type="password"
                  helperText={
                    errors.confirmPassword && touched.confirmPassword
                      ? errors.confirmPassword
                      : ""
                  }
                  error={
                    errors.confirmPassword && touched.confirmPassword
                      ? true
                      : false
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <SubmitButton
                    children={isLoading ? "Loading" : "Sign up"}
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
  errorMessage: state.auth.error,
  isLoading: state.auth.loading,
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    resetPassword: (model: ResetPasswordRequest) =>
      dispatch(resetPassword(model)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
