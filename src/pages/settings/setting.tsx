import {
  Grid,
  makeStyles,
  Container,
} from "@material-ui/core";
import SettingsForm from './settingsForm';
function Settings()  {

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      marginTop: "30px",
      backgroundColor: "white",
      "& .MuiGrid-root ": {
        alignContent: "center",
        margin: "auto",
      },
    },
    iconStyle: {
      color: "#C490D1",
      width: 300,
      height: 300,
    },
  });
  const classes = useStyles();
  return (
    <div className="app_bar">
      <Container className={classes.root} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
        <SettingsForm  isLoading={false} errorMessage={undefined}/>
        </Grid>
      </Grid>
    </Container>
    </div>
  );
}

export default Settings;