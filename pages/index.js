import React from "react";
import Layout from "../layouts/Layout";

import styled from "styled-components";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";

import ContainedButtons from "./components/ContainedButtons";
import SimpleList from "./components/SimpleList";
import SideBarCard from "./components/SideBarCard";

import dynamic from "next/dynamic";

const MapBoxNoSSR = dynamic(() => import("./components/MapBox"), {
  ssr: false,
});

const Dashboard = () => {
  return (
    <Layout>
      <MapBoxNoSSR />
    </Layout>
  );
};

export default Dashboard;
