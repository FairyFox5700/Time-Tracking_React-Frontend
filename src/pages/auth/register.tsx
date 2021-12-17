import React, { Dispatch, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  Grid,
  Typography,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { Formik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import { RegistrationRequest } from "../../types/auth/auth";
import SubmitButton from "../../components/controls/submitButton";
import TextInput from "../../components/controls/textInput";
import FormHeader from "../../components/controls/formHeader";
import { registration } from "../../redux/actions/auth/authActions";
import Alert from "@material-ui/lab/Alert";
import { RootState } from "../../store";
import { connect } from "react-redux";
import FormPopupDialog from "../../components/popup/formPopup";

type RegisterProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    register: (model: RegistrationRequest) => void;
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

const Register: React.FC<RegisterProps> = ({
  register,
  isLoading,
  errorMessage,
  isLogedIn,
}) => {
  const classes = useStyles();

  const initialValues: RegistrationRequest = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
    confirmPassword: "",
    clientUrl:
      //todo: change approach to get url from config or smth
      "http://localhost:43396/email-confirmation-redirect",
  };

  //http://localhost:3000/email-confirmation-redirect
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter valid email").required("Required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    username: Yup.string().required("User name is required"),
    password: Yup.string().required(
      "Please valid password. One uppercase, one lowercase, one special character and no spaces"
    ),
    confirmPassword: Yup.string()
      .required("Required")
      .test("password-match", "Password musth match", function (value) {
        return this.parent.password === value;
      }),
  });

  const history = useHistory();

  const onSubmit = (values: RegistrationRequest, actions: any) => {
    register(values);
    console.log(values);
    actions.resetForm();
    actions.setSubmitting(false);
    setTimeout(() => {
      if (!errorMessage) {
        history.push("/email-confirmation");
      }
    }, 30000);
  };
  const [openPopup, setOpenPopup] = useState(true);

  return (
    <FormPopupDialog title="" openPopup={openPopup} setOpenPopup={setOpenPopup}>
      <Grid className={classes.root}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props: FormikProps<RegistrationRequest>) => {
            const { values, touched, errors, handleBlur, handleChange } = props;
            return (
              <Form>
                <FormHeader children="Sign up" />
                <Grid container justify="space-around" direction="row">
                  <TextInput
                    name="username"
                    type="text"
                    id="username"
                    label="User name"
                    value={values.username}
                    helperText={
                      errors.username && touched.username ? errors.username : ""
                    }
                    error={errors.username && touched.username ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextInput
                    name="firstName"
                    id="firstName"
                    label="First name"
                    type="text"
                    value={values.firstName}
                    helperText={
                      errors.firstName && touched.firstName
                        ? errors.firstName
                        : ""
                    }
                    error={errors.firstName && touched.firstName ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextInput
                    name="lastName"
                    id="lastName"
                    label="Last name"
                    value={values.lastName}
                    type="text"
                    helperText={
                      errors.lastName && touched.lastName ? errors.lastName : ""
                    }
                    error={errors.lastName && touched.lastName ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
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
        <Typography variant="h6" className={classes.textBottom}>
          <Link to="/forgot-password">Forgot password ?</Link>
        </Typography>
        <Typography variant="h6" className={classes.textBottom}>
          <Link to="/login">Sign in</Link>
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
    register: (model: RegistrationRequest) => dispatch(registration(model)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
