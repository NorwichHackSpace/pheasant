import React from "react";
import DashboardTwoToneIcon from "@material-ui/icons/DashboardTwoTone";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PageviewTwoToneIcon from "@material-ui/icons/PageviewTwoTone";
import ReportProblemTwoToneIcon from "@material-ui/icons/ReportProblemTwoTone";
import AssignmentIcon from '@material-ui/icons/Assignment';
import BuildIcon from '@material-ui/icons/Build';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SettingsIcon from '@material-ui/icons/Settings';

//import pages from "./pages";

const pages = [
  {
    title: "Dashboard",
    href: "/",
    icon: <DashboardTwoToneIcon />,
  },
  {
    title: "Map",
    href: "/map",
    icon: <PageviewTwoToneIcon />,
  },
  {
    title: "Equipment",
    href: "/equipment",
    icon: <BuildIcon />,
  },
  
  {
    title: "Assignments",
    href: "/assignment",
    icon: <AssignmentIcon />,    
  },
  {
    title: "Resources",
    href: "/Resources",
    icon: <MenuBookIcon />,
  },
  {
    title: "Admin",
    href: "/Resources",
    icon: <SettingsIcon />,
  },
];

export default pages;
