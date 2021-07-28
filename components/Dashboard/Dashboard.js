import React from "react";
import ResponsiveLocalStorageLayout from "../ResponsiveGrid/ResponsiveGrid";
import useStyles from "./Dashboard-styles";

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ResponsiveLocalStorageLayout />    
    </div>
  );
};

export default Dashboard;
