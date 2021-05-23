import IconButton from "@material-ui/core/IconButton";
import { AccountCircle } from "@material-ui/icons";
import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { RemoveAccessToken, RemoveRefreshToken } from "../../utils/jwtUtils";
import { useHistory } from "react-router-dom";

const AccountItem = () => {
  const menuId = "primary-search-account-menu";
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
    RemoveRefreshToken();
    RemoveAccessToken();
    history.push("/login");
  };
  const isMenuOpen = Boolean(anchorEl);
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );
  return (
    <>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          className="avatar_icon"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
      {renderMenu}
    </>
  );
};

export default AccountItem;
