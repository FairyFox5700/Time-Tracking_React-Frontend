import React from "react";
import { NavLink } from "react-router-dom";
import AssessmentIcon from "@material-ui/icons/Assessment";

const ReportGeneration = () => {
  return (
    <NavLink to="/reports-types" activeClassName="active-area">
      <div className="reports-area">
        <AssessmentIcon />
        <span>Reports</span>
      </div>
    </NavLink>
  );
};

export default ReportGeneration;
