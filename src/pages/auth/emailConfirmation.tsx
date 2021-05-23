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
} from "../../types/auth/auth";
import SubmitButton from "../../components/controls/submitButton";
import TextInput from "../../components/controls/textInput";
import FormHeader from "../../components/controls/formHeader";
import {
  confirmEmail,
  resendVerificationEmail,
} from "../../redux/actions/auth/authActions";
import Alert from "@material-ui/lab/Alert";
import { RootState } from "../../store";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";

type ResendEmailConfirmationProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    handleChange: any;
    sendEmailConfirmation: (model: EmailConfirmationRequest) => void;
    resendEmailConfrimation: (model: ResendEmailConfirmationRequest) => void;
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

const EmailConfirmation: React.FC<ResendEmailConfirmationProps> = ({
  handleChange,
  sendEmailConfirmation,
  resendEmailConfrimation,
  isLoading,
  errorMessage,
}) => {
  const classes = useStyles();

  const query = useQuery();
  useEffect(() => {
    const request: EmailConfirmationRequest = {
      userId: query.get("UserId"),
      code: query.get("Code"),
    };
    console.log("request", request);
    sendEmailConfirmation(request);
  });
  const initialValues: ResendEmailConfirmationRequest = {
    email: "",
    сlientUrl: "http://localhost:3000/email-confirmation",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter valid email").required("Required"),
  });

  const onSubmit = (values: ResendEmailConfirmationRequest, actions: any) => {
    resendEmailConfrimation(values);
    console.log("val", values);
    actions.resetForm();
    actions.setSubmitting(false);
    if (!isLoading) <Redirect to="/login" />;
  };

  return (
    <Grid className={classes.root}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(props: FormikProps<ResendEmailConfirmationRequest>) => {
          const { values, touched, errors, handleBlur, handleChange } = props;
          return (
            <Form>
              <FormHeader children="Email confirmation" />
              <Grid container justify="space-around" direction="row">
                <Grid item lg={10} md={10} sm={10} xs={10}>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.textPrimary}
                  >
                    Email confirmation link was sent to yor email adress. Please
                    check your email box.
                  </Typography>
                </Grid>
                <Grid item lg={10} md={10} sm={10} xs={10}>
                  <Typography
                    variant="h4"
                    component="h2"
                    className={classes.text}
                  >
                    Have not get an email confirmation link? Type your email in
                    input below and we will send email confirmation link to you
                    again
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
                    children={isLoading ? "Loading" : "Resend"}
                    onClick={() => onSubmit}
                    disabled={isLoading}
                  ></SubmitButton>
                  <Link to="/login">
                    <SubmitButton
                      children={isLoading ? "Loading" : "Login"}
                      onClick={undefined}
                      disabled={isLoading}
                    ></SubmitButton>
                  </Link>
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
    sendEmailConfirmation: (model: EmailConfirmationRequest) =>
      dispatch(confirmEmail(model)),
    resendEmailConfrimation: (model: ResendEmailConfirmationRequest) =>
      dispatch(resendVerificationEmail(model)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmation);
