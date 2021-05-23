import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";

export interface FormPopupProps {
  title: string;
  clidren?: any;
  openPopup: any;
  setOpenPopup: any;
}
const FormPopupDialog: React.FC<FormPopupProps> = ({
  title,
  children,
  openPopup,
  setOpenPopup,
}) => {
  return (
    <Dialog fullWidth open={openPopup} aria-labelledby="form-dialog-title">
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenPopup(false)} color="primary">
          <CloseIcon />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormPopupDialog;
