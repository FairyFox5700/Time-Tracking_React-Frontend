import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { FormControl, FormHelperText, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "100%",
    },
    minWidth: "350px",
    padding: "0 30px",
    "&:hover": {
      background: "#b8b8ff",
    },
    marginBottom: "20px",
    background: "#f8f7ff",
    lineHeight: "40px",
    borderWidth: "0",
    borderRadius: "20px",
    fontFamily: "'Roboto', sans-serif",
  },
}));


interface AutoCompleteParams {
  options: Array<any>;
  onChange: any;
  name:string;
  label:string;
  value:any;
  error:boolean;
}

const AutoCompleteInput: React.FC<AutoCompleteParams> = ({
  options,
  onChange,
  name,
  label,
  value,
  error,
}) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.root} {...(error && { error: true })}>
    <Autocomplete
      options={options}
      onChange={onChange}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
      {...error && <FormHelperText>{error}</FormHelperText>}
    />
    </FormControl>
  );
};
export default AutoCompleteInput;