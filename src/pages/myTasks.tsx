import React from "react";
import { Typography } from "@material-ui/core";
import WorkLogGrid from "./worklog/workLogGrid";
import { getUserId } from "../utils/jwtUtils";

function MyWork() {
  return (
    <div className="app_bar">
      <Typography>My recent worklogs</Typography>
      <WorkLogGrid userId={getUserId()} />
    </div>
  );
}
export default MyWork;
