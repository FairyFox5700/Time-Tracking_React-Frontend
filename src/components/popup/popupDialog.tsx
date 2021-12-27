import {
  Button, Dialog, DialogActions, DialogContent,
  makeStyles
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

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
  onClose?: () => void;
}
const PopupDialog: React.FC<DialogPopupProps> = ({
  title,
  children,
  openPopup,
  setOpenPopup,
  onClose
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
            onClose && onClose();
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
