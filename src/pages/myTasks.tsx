import { Typography } from "@material-ui/core";
import React from "react";
import { getUserId } from "../utils/jwtUtils";
import WorkLogGrid from "./worklog/workLogGrid";

function MyWork() {
  return (
    <div className="app_bar">
      <Typography>My recent worklogs</Typography>
      <WorkLogGrid userId={getUserId()} />
    </div>
  );
}
export default MyWork;
