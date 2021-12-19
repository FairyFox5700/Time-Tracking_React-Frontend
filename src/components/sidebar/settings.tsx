import React from "react";
import { NavLink } from "react-router-dom";
import SettingsIcon from '@material-ui/icons/Settings';

const Settings = () =>  {
    return (
      <NavLink to="/settings" activeClassName="active-area">
        <div className="kanban__sidebar-settings">
          <SettingsIcon />
          <span>Settings</span>
        </div>
      </NavLink>
    );
  }

export default Settings;