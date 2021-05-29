import React, { Dispatch, useEffect, useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import {
  Grid,
  Typography,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { Formik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import { LoginRequest } from "../../types/auth/auth";
import SubmitButton from "../../components/controls/submitButton";
import TextInput from "../../components/controls/textInput";
import FormHeader from "../../components/controls/formHeader";
import { loginRequest } from "../../redux/actions/auth/authActions";
import Alert from "@material-ui/lab/Alert";
import { RootState } from "../../store";
import { connect } from "react-redux";
import FormPopupDialog from "../../components/popup/formPopup";
import { isUserLoggedIn } from "../../utils/jwtUtils";

type LoginProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    handleChange: any;
    login: (model: LoginRequest) => void;
    isLoading: boolean;
    errorMessage: string | undefined;
    isLogedIn?: boolean;
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
  })
);

const Login: React.FC<LoginProps> = ({
  handleChange,
  login,
  isLoading,
  errorMessage,
  isLogedIn,
}) => {
  const classes = useStyles();

  const initialValues: LoginRequest = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter valid email").required("Required"),
    password: Yup.string().required(
      "Please valid password. One uppercase, one lowercase, one special character and no spaces"
    ),
  });
  useEffect(() => {
    if (isLogedIn === true) {
      setOpenPopup(false);
    }
  }, [isLogedIn]);

  useEffect(() => {
    setTimeout(() => {
      if (isUserLoggedIn()) {
        history.push("/home");
      }
    }, 100);
  }, [isUserLoggedIn()]);

  const history = useHistory();
  const onSubmit = (values: LoginRequest, actions: any) => {
    login(values);
    actions.resetForm();
    actions.setSubmitting(false);
  };

  const [openPopup, setOpenPopup] = useState(true);
  return (
    <FormPopupDialog
      title="Sign up"
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}
    >
      <Grid className={classes.root}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props: FormikProps<LoginRequest>) => {
            const { values, touched, errors, handleBlur, handleChange } = props;
            return (
              <Form>
                <FormHeader children="Sign in" />
                <Grid container justify="space-around" direction="row">
                  <TextInput
                    name="email"
                    id="email"
                    label="Email"
                    value={values.email}
                    type="email"
                    helperText={
                      errors.email && touched.email ? errors.email : ""
                    }
                    error={errors.email && touched.email ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
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
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <SubmitButton
                      children={
                        isLoading && !errorMessage ? "Loading" : "Sign in"
                      }
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
        <Typography variant="h6" className={classes.textBottom}>
          <Link to="/forgot-password">Forgot password ?</Link>
        </Typography>
        <Typography variant="h6" className={classes.textBottom}>
          <Link to="/signup">Sign up</Link>
        </Typography>
      </Grid>
    </FormPopupDialog>
  );
};

const mapStateToProps = (state: RootState) => ({
  errorMessage: state.auth.error,
  isLoading: state.auth.loading,
  isLogedIn: state.auth.isLogedIn,
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    login: (model: LoginRequest) => dispatch(loginRequest(model)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
