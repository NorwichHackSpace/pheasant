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
const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <LocationCard />
      </Grid>
    </div>
  );
};

export default Dashboard;
