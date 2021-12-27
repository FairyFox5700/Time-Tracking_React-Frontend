import React from "react";
import { Button, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5),
  },
  secondary: {
    backgroundColor: theme.palette.secondary.light,
    "& .MuiButton-label": {
      color: theme.palette.secondary.main,
    },
  },
  primary: {
    backgroundColor: theme.palette.primary.light,
    "& .MuiButton-label": {
      color: theme.palette.primary.main,
    },
  },
}));

export interface ActionButtonProps {
  color: "string";
  childres: any;
  onClick: any;
}
const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const { color, children, onClick } = props;
  const classes: any = useStyles();

  return (
    <Button className={`${classes.root} ${classes[color]}`} onClick={onClick}>
      {children}
    </Button>
  );
};

export default ActionButton;
