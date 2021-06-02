import React, { Dispatch, useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Typography,
  createStyles,
  Theme,
  makeStyles,
} from "@material-ui/core";
import { Formik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import { ForgotPasswordRequest } from "../../types/auth/auth";
import SubmitButton from "../../components/controls/submitButton";
import TextInput from "../../components/controls/textInput";
import FormHeader from "../../components/controls/formHeader";
import { forgotPassword } from "../../redux/actions/auth/authActions";
import Alert from "@material-ui/lab/Alert";
import { RootState } from "../../store";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";

type ForgotPasswordProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    handleChange: any;
    forgotPassword: (model: ForgotPasswordRequest) => void;
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

const ForgotPasswordForm: React.FC<ForgotPasswordProps> = ({
  handleChange,
  forgotPassword,
  isLoading,
  errorMessage,
}) => {
  const classes = useStyles();

  const initialValues: ForgotPasswordRequest = {
    email: "",
    clientUrl: "http://fathomless-badlands-84691.herokuapp.com/reset-password",
  };
  //http://localhost:3000/reset-password

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter valid email").required("Required"),
  });

  const onSubmit = (values: ForgotPasswordRequest, actions: any) => {
    forgotPassword(values);
    actions.resetForm();
    actions.setSubmitting(false);
  };

  return (
    <Grid className={classes.root}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(props: FormikProps<ForgotPasswordRequest>) => {
          const { values, touched, errors, handleBlur, handleChange } = props;
          return (
            <Form>
              <FormHeader children="Forgot password" />
              <Grid container justify="space-around" direction="row">
                <Grid item lg={10} md={10} sm={10} xs={10}>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.textPrimary}
                  >
                    Type your email in input below and we will send an email
                    with forgot password link to you again
                  </Typography>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Divider variant="inset" component="li" />
                </Grid>
                <TextInput
                  name="email"
                  id="email"
                  label="Email"
                  value={values.email}
                  type="email"
                  helperText={errors.email && touched.email ? errors.email : ""}
                  error={errors.email && touched.email ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <SubmitButton
                    children={isLoading ? "Loading" : "Send my link"}
                    onClick={undefined}
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
    forgotPassword: (model: ForgotPasswordRequest) =>
      dispatch(forgotPassword(model)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm);
