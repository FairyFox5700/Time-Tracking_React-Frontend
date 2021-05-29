import React, { ReactNode } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
  Button,
  DialogActions,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    minWidth: "1200px",
    padding: theme.spacing(1),
    position: "absolute",
    top: theme.spacing(1),
  },
  dialogTitle: {
    paddingRight: "0px",
  },
}));

export interface DialogPopupProps {
  title: string;
  clidren?: any;
  openPopup: any;
  setOpenPopup: any;
}
const PopupDialog: React.FC<DialogPopupProps> = ({
  title,
  children,
  openPopup,
  setOpenPopup,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogActions>
        <Button
          color="secondary"
          onClick={() => {
            setOpenPopup(false);
          }}
        >
          <CloseIcon />
        </Button>
      </DialogActions>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default PopupDialog;
