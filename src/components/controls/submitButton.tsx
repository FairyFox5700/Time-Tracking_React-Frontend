import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#9381ff",
    border: 0,
    margin: "30px auto",
    borderBottom: "4px solid rgb(184, 184, 255)",
    fontSize: "20px",
    textTransform: "none",
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(184, 184, 255, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    "&:hover": {
      background: "#b8b8ff",
    },
  },
}));

export interface ButtonProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled: boolean | undefined;
}

const SubmitButton: React.FC<ButtonProps> = (props) => {
  const { children, onClick, disabled } = props;
  const classes = useStyles();

  return (
    <Button
      type="submit"
      color="secondary"
      variant="contained"
      disabled={disabled}
      className={classes.root}
      fullWidth
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
