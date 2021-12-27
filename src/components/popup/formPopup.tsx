import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

export interface FormPopupProps {
  title: string;
  clidren?: any;
  openPopup: any;
  setOpenPopup: any;
  onClose: ()=>any;
}
const FormPopupDialog: React.FC<FormPopupProps> = ({
  title,
  children,
  openPopup,
  setOpenPopup,
  onClose,
}) => {
  const btnOnClose = () =>{
    setOpenPopup(false);
    onClose();
  }
  return (
    <Dialog fullWidth open={openPopup} aria-labelledby="form-dialog-title">
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={() => btnOnClose()} color="primary">
          <CloseIcon />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormPopupDialog;
