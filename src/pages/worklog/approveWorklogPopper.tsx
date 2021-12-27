import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { Dispatch, useState } from "react";
import { connect } from "react-redux";
import { updateStatusWorklog } from "../../redux/actions/workLogsActions";
import {
  UpdateWorkLogStatusRequest,
  WorkLogModel
} from "../../types/worklogs/worklogs";
import WorklogDescriptionForm from "./worklogDexscriptionForm";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

type AproveWorklogProps = ReturnType<typeof mapDispatchToProps> & {
  worklogId: string;
  isApproved: boolean;
  approveWorklog?: (request: UpdateWorkLogStatusRequest) => void;
};

const AproveWorklogPopper: React.FC<AproveWorklogProps> = ({
  approveWorklog,
  worklogId,
  isApproved,
}) => {
  const [anchorEl, setAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);
  const [description, setDescription] = useState("");
  const [enabled, setEnabled] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isApproved) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
    handleUpdateStatus();
  };

  const handleUpdateStatus = () => {
    const request: UpdateWorkLogStatusRequest = {
      isApproved: isApproved ? false : true,
      workLogId: worklogId,
      description: description,
    };
    console.log("enabled", enabled);
    if (!request.isApproved) {
      return;
    } else {
      approveWorklog(request);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const onSubmit = (values: WorkLogModel, actions: any) => {
    console.log({ values, actions });
    setDescription(values.description);
    actions.setSubmitting(false);
    handleUpdateStatus();
    handleClose();
  };

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        {isApproved ? "Disapprove" : "Approve"}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <WorklogDescriptionForm worklogId={worklogId} isApproved={isApproved} />
      </Popover>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    approveWorklog: (request: UpdateWorkLogStatusRequest) =>
      dispatch(updateStatusWorklog(request)),
  };
};

export default connect(null, mapDispatchToProps)(AproveWorklogPopper);
