import { createStyles, Fade, makeStyles, Popper, Theme } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import { AccountCircle } from "@material-ui/icons";
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';
import React from "react";
import { useHistory } from "react-router-dom";
import { RemoveAccessToken, RemoveRefreshToken } from "../../utils/jwtUtils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
    root: {
      width: "100%",
      maxWidth: 460,
      backgroundColor: theme.palette.primary.main,
    },
  })
);

const AccountItem = () => {
  const menuId = "primary-search-account-menu";

  const history = useHistory();
  const handleMenuClose = () => {
    RemoveRefreshToken();
    RemoveAccessToken();
    history.push("/login");
  };
 const classes = useStyles();
  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
    {(popupState) => (
      <div>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          className="avatar_icon"
          {...bindToggle(popupState)}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
        <div className={classes.root}>
        <MenuItem onClick={handleMenuClose}>
        Logout
        </MenuItem>
        </div>
        </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
};

export default AccountItem;
