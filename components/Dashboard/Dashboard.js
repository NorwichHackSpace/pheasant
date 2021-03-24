import React from "react";
import { Grid } from "@material-ui/core";
import useStyles from "./Dashboard-styles";
import LocationCard, { LocationCardSpecificed  } from "../Locations/LocationCard";
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
