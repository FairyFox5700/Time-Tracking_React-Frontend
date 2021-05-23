import React from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

export interface AvatarProps {
  name: string;
  surname: string;
  label: string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      flexFlow: "row nowrap",
      justifyСontent: "center",
    },
    userTittle: {
      fontSize: "16px",
      whiteSpace: "nowrap",
      justifyСontent: "center",
      alignSelf: "center",
      marginLeft: "8px",
      textTransform: "capitalize",
      padding: "10px",
    },
    label: {
      display: "inline",
      fontSize: "16px",
      fontWeight: "normal",
    },
  })
);

const AvatarItem: React.FC<AvatarProps> = ({ name, surname, label }) => {
  const fullName = name + " " + surname;
  const iconName = name[0] + " " + surname[0];
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar>{iconName}</Avatar>
      <div className={classes.userTittle}>
        <Typography variant="subtitle2" className={classes.label}>
          <b>{label}:</b> {fullName}
        </Typography>
      </div>
    </div>
  );
};

export default AvatarItem;
