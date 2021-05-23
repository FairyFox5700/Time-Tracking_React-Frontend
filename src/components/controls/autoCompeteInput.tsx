import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "0 20px",
    background: "#f8f7ff",
    lineHeight: "40px",
    borderWidth: "0",
    borderRadius: "20px",
    fontFamily: "'Roboto', sans-serif",
    margin: "10px auto",
  },
}));

interface AutoCompleteParams {
  options: Array<any>;
  selectorDisplay: ((option: any) => string) | undefined;
}

const AutoCompleteInput: React.FC<AutoCompleteParams> = ({
  options,
  selectorDisplay,
}) => {
  const classes = useStyles();
  return (
    <Autocomplete
      id="combo-box-demo"
      options={options}
      className={classes.root}
      getOptionLabel={selectorDisplay}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Combo box" variant="outlined" />
      )}
    />
  );
};
export default AutoCompleteInput;
