import React from "react";
import DashboardTwoToneIcon from "@material-ui/icons/DashboardTwoTone";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PageviewTwoToneIcon from "@material-ui/icons/PageviewTwoTone";
import ReportProblemTwoToneIcon from "@material-ui/icons/ReportProblemTwoTone";

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
    icon: <ReportProblemTwoToneIcon />,
  },
];

export default pages;
