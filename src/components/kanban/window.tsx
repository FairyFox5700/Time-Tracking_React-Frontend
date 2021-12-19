import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

export interface AlertDialogProps {
  onOpen: any;
  item: any;
  onClose: any;
}
const AlertDialog: React.FC<AlertDialogProps> = ({ onOpen, item, onClose }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      margin: {
        margin: theme.spacing(1),
      },
      extendedIcon: {
        marginRight: theme.spacing(1),
      },
    })
  );
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        className={classes.margin}
        onClick={handleClickOpen}
      >
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <div className={"close-btn-ctn"}>
            <h1 style={{ flex: "1 90%" }}>{item.title}</h1>
          </div>
          <div>
            <h2>Description</h2>
            <p>{item.content}</p>
            <h2>Status</h2>
            <p>
              {item.icon}{" "}
              {`${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}`}
            </p>
          </div>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AlertDialog;
