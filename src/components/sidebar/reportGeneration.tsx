import AssessmentIcon from "@material-ui/icons/Assessment";
import React from "react";
import { NavLink } from "react-router-dom";

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
