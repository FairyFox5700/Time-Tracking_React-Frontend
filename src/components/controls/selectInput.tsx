import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "100%",
    },
    display:"flex",
    minWidth: "150px",
    padding: "0 20px",
    marginBottom: "20px",
    background: "#f8f7ff",
    lineHeight: "40px",
    borderWidth: "0",
    borderRadius: "20px",
    fontFamily: "'Roboto', sans-serif",
  },
}));

export interface SelectProps {
  name: string;
  label: string;
  value: any;
  error: boolean;
  options: Array<any>;
  onChange: any;
  onBlur: any;
  selectorDisplay?: ((option: any) => string) | undefined;
  selectorValue?: ((option: any) => string) | undefined;
}
const SelectInput: React.FC<SelectProps> = (props) => {
  const {
    name,
    label,
    value,
    error,
    onChange,
    options,
    onBlur,
    selectorDisplay,
    selectorValue,
  } = props;
  const classes = useStyles();
  return (
    <FormControl className={classes.root} {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map((item: any, index: number) => (
          <MenuItem
            key={index}
            value={selectorValue ? selectorValue(item) : item}
          >
            {selectorDisplay ? selectorDisplay(item) : item}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
export default SelectInput;