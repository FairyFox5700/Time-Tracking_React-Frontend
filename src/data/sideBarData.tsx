import AssessmentIcon from "@material-ui/icons/Assessment";
import ClassIcon from "@material-ui/icons/Class";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import GroupIcon from "@material-ui/icons/Group";
import ScheduleIcon from "@material-ui/icons/Schedule";
import SettingsIcon from "@material-ui/icons/Settings";
import SpeedIcon from "@material-ui/icons/Speed";
import ViewListIcon from "@material-ui/icons/ViewList";
import { SidebarItem } from "../types/SidebarItem";
import { isUserEngineer } from "../utils/jwtUtils";

const sidebar: Array<SidebarItem> = [
  {
    title: "Calendar",
    path: "/calendar",
    icon: <ScheduleIcon />,
    cName: "side_navbar_text",
  },
  {
    title: "Board",
    path: "/board",
    icon: <DeveloperBoardIcon />,
    cName: "side_navbar_text",
  },
  {
    title: "Report",
    path: "/reports-types",
    icon: <AssessmentIcon />,
    cName: "side_navbar_text",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <SettingsIcon />,
    cName: "side_navbar_text",
  },
  {
    title: "Milestones",
    path: "/milestones",
    icon: <SpeedIcon />,
    cName: "side_navbar_text",
  },
  {
    title: "Teams",
    path: "/teams",
    icon: <GroupIcon />,
    cName: "side_navbar_text",
  },
  {
    title: "Projects",
    path: "/projects",
    icon: <ClassIcon />,
    cName: "side_navbar_text",
  },
  {
    title: "User Worklogs",
    path: "/user-worklogs",
    icon: <ViewListIcon />,
    cName: "side_navbar_text",
  },
];

export const getSideBarData = () => {
  if (isUserEngineer()) {
    return sidebar.slice(0, 4);
  }
  return sidebar;
};
