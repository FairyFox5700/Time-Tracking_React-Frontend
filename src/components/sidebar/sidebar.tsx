import React, { useState } from "react";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import { getSideBarData } from "../../data/sideBarData";
import "./styles.css";
import { PropSidebar } from "../../types/PropSidebar";
import { Button } from "@material-ui/core";

const Sidebar: React.FC<PropSidebar> = ({
  sideBarOpen,
  handleDrawerOpenClose,
}) => {
  return (
    <>
      <nav
        className={sideBarOpen ? "side_navbar_menu active" : "side_navbar_menu"}
      >
        <ul className="side_navbar_list" onClick={handleDrawerOpenClose}>
          <li className="side_navbar_toggler">
            <Button className="side_navbar_items open">
              <CloseIcon />
            </Button>
          </li>

          {getSideBarData().map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Divider />
    </>
  );
};

export default Sidebar;
