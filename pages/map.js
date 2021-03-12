import React from "react";
import NoSsr from "@material-ui/core/NoSsr";
import MapBox from "../components/MapBox/MapBox";

const Dashboard = () => {
  return (
    <NoSsr>
      <MapBox />
    </NoSsr>
  );
};

export default Dashboard;
