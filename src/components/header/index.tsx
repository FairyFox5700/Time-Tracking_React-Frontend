import React, { useContext, useState } from "react";
import { Container } from "./styles";
import "./styles.css";
import AccountItem from "./account";
import NotificationItem from "./notification";
import Messages from "./messages";
import Search from "./search";
import SwitchTheme from "./switchTheme";
import SwitchSideBar from "./sideBarSwitch";
import ThemeProps from "../../types/ThemProps";
import { isUserLoggedIn } from "../../utils/jwtUtils";
import ActionsPopper from "../poper/actionPoper";

const Header: React.FC<ThemeProps> = ({ toggleTheme }) => {
  const [open, setOpen] = useState(false);

  const isLogedIn = isUserLoggedIn();
  const handleDrawerOpenClose = () => {
    if (isLogedIn) setOpen(!open);
  };

  return (
    <Container className="header">
      {isLogedIn && (
        <>
          <div className="switch_flex">
            <SwitchSideBar
              sideBarOpen={open}
              handleDrawerOpenClose={handleDrawerOpenClose}
            />
            <div className="container_header">LILO</div>
          </div>
          <div className="container_info">
            <ActionsPopper />
            <Search />
            <Messages />
            <NotificationItem />
            <AccountItem />
            <SwitchTheme toggleTheme={toggleTheme} />
          </div>
        </>
      )}
    </Container>
  );
};

export default Header;
