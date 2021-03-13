import React from "react";
import { Grid } from "@material-ui/core";
// import {
//   FxTile,
//   Widget,
//   SimpleTable,
//   SimpleLineChart,
//   SimpleRandarChart,
//   SimpleBarChart,
// } from "../components";
import useStyles from "./Dashboard-styles";
import LocationCard from "../LocationLatLong/LocationCard";
import ResponsiveLocalStorageLayout from "../ResponsiveGrid/ResponsiveGrid";
const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ResponsiveLocalStorageLayout>
        <LocationCard />
      </ResponsiveLocalStorageLayout>
    </div>
  );
};

export default Dashboard;
