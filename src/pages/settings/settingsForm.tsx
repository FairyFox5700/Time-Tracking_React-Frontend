import {
    createStyles, Grid, makeStyles, Paper, Theme, Typography
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { useHistory } from "react-router";
import AutoCompleteInput from "../../components/controls/autoCompeteInput";
import FormHeader from "../../components/controls/formHeader";
import SubmitButton from "../../components/controls/submitButton";
import { BoardTypes, ProjectSettingRequest } from "../../types/settings/settings";
import { resetBoardTypeToSettings } from "../../utils/jwtUtils";

type SettingsFormProps =
    {
        isLoading: boolean;
        errorMessage: string | undefined;
        isLogedIn?: boolean;
    };

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: "2050px",
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
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            width:"70%"
        },
        textBottom: {
            textAlign: "center",
            margin: "8px",
            fontSize: "36px",
            color: "#707981",
        },
    })
);
const initialValues: ProjectSettingRequest = {
    boardType: "Kanban",
};

const SettingsForm: React.FC<SettingsFormProps> = ({
    isLoading,
    errorMessage,
    isLogedIn,
}) => {
    const classes = useStyles();
    const setSettings = (val:string|null)=>{

        initialValues.boardType = val??"";
    };
    const history = useHistory();
    const onSubmit = (values: ProjectSettingRequest, actions: any) => {
        resetBoardTypeToSettings(values.boardType.toString());
        actions.resetForm();
        actions.setSubmitting(false);
    };

    return (
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                >
                    {(props: FormikProps<ProjectSettingRequest>) => {
                        const { values,  handleChange } = props;
                        return (
                            <Form>
                                <Grid container justify="space-around" direction="row" spacing={6}>
                                    <Grid item xs={12}>
                                        <FormHeader children="SETTINGS AND CONFIGURATION" />
                                    </Grid>
                                    <Grid item lg={3} md={3} sm={3} xs={3}>
                                        <Typography className={classes.textBottom} variant="h2" component="h1">
                                            Board type
                                        </Typography>
                                    </Grid>
                                    <Grid item  lg={9} md={9} sm={9} xs={9}>
                                        <Paper className={classes.paper}>
                                        <AutoCompleteInput
                                            name="boardType"
                                            label="Select board type"
                                            value={values.boardType}
                                            onChange={(event: any, newValue: string | null) => {
                                                setSettings(newValue);
                                              }}
                                            options={BoardTypes}
                                            error={false}>
                                        </AutoCompleteInput>
                                        </Paper>
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={4}>
                                        <SubmitButton
                                            children={
                                                isLoading && !errorMessage ? "Loading" : "Apply settings"
                                            }
                                            onClick={() => onSubmit}
                                            disabled={isLoading}
                                        ></SubmitButton>
                                    </Grid>
                                    {errorMessage && (
                                        <Grid item lg={4} md={4} sm={4} xs={4}>
                                            <Alert severity="error">{errorMessage}</Alert>
                                        </Grid>
                                    )}
                                </Grid>
                            </Form>
                        );
                    }}
                </Formik>
    );
}
export default SettingsForm;

