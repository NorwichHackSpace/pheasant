import React from "react";
import Layout from "../layouts/Layout";
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
