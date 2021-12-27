import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core";
import {
  KeyboardDatePicker, MuiPickersUtilsProvider
} from "@material-ui/pickers";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    "& .MuiFormControl-root ": {
      margin: "10px auto",
    },
  },
}));

export interface DatePickerProps {
  name: string;
  label: string;
  value: any;
  onChange: any;
}

const DatePickerInput: React.FC<DatePickerProps> = (props) => {
  const { name, label, value, onChange } = props;
  const classes = useStyles();
  const convertToDefEventPara = (name: string, value: Date | null) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          id="date-picker-dialog"
          disableToolbar
          variant="inline"
          inputVariant="outlined"
          label={label}
          format="MM/dd/yyyy"
          margin="normal"
          name={name}
          value={value}
          onChange={(date: Date | null) =>
            onChange(convertToDefEventPara(name, date))
          }
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DatePickerInput;
