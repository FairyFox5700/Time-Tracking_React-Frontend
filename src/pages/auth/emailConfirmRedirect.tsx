import {
  createStyles, Grid, makeStyles, Theme, Typography
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Alert from "@material-ui/lab/Alert";
import { Form, Formik, FormikProps } from "formik";
import React, { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";
import { apiUrls } from "../../api/clients/config";
import FormHeader from "../../components/controls/formHeader";
import SubmitButton from "../../components/controls/submitButton";
import { confirmEmail } from "../../redux/actions/auth/authActions";
import { RootState } from "../../store";
import {
  EmailConfirmationRequest,
  ResendEmailConfirmationRequest
} from "../../types/auth/auth";


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

const EmailConfirmationRedirect: React.FC<ResendEmailConfirmationProps> = ({
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
  //    сlientUrl: "http://timetrackingapp2021.herokuapp.com/email-confirmation",
  const initialValues: ResendEmailConfirmationRequest = {
    email: "",
    сlientUrl: `${apiUrls.identityUrl}/email-confirmation`,
  };

  //http://localhost:3000/email-confirmation
  const onSubmit = (values: ResendEmailConfirmationRequest, actions: any) => {
    if (!isLoading) <Redirect to="/login" />;
  };

  return (
    <Grid className={classes.root}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(props: FormikProps<ResendEmailConfirmationRequest>) => {
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
                    Your email was confirmed. Click to login
                  </Typography>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Divider variant="inset" component="li" />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Link to="/login">
                    <SubmitButton
                      children={isLoading ? "Loading" : "Login"}
                      onClick={() => onSubmit}
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailConfirmationRedirect);
