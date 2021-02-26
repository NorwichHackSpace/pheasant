import React from "react";
import styled from "styled-components";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";

import Layout, {
  Root,
  getHeader,
  getDrawerSidebar,
  getSidebarTrigger,
  getSidebarContent,
  getCollapseBtn,
  getContent,
} from "@mui-treasury/layout";
import ContainedButtons from "./components/ContainedButtons";
import SimpleList from "./components/SimpleList";
import SideBarCard from "./components/SideBarCard";
import OpenMap from "./components/OpenMap";

const Header = getHeader(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const SidebarTrigger = getSidebarTrigger(styled);
const SidebarContent = getSidebarContent(styled);
const CollapseBtn = getCollapseBtn(styled);
const Content = getContent(styled);

const scheme = Layout();

scheme.configureHeader((builder) => {
  builder
    .registerConfig("xs", {
      position: "sticky",
    })
    .registerConfig("md", {
      position: "relative", // won't stick to top when scroll down
    });
});

scheme.configureEdgeSidebar((builder) => {
  builder
    .create("unique_id", { anchor: "left" })
    .registerTemporaryConfig("xs", {
      anchor: "left",
      width: "auto", // 'auto' is only valid for temporary variant
    })
    .registerPermanentConfig("md", {
      width: 256, // px, (%, rem, em is compatible)
      collapsible: true,
      collapsedWidth: 64,
    });
});

scheme.enableAutoCollapse("unique_id", "md");

const Dashboard = () => {
  return (
    <Root scheme={scheme}>
      {({ state: { sidebar } }) => (
        <>
          <CssBaseline />
          <Header>
            <Toolbar>
              <SidebarTrigger sidebarId="unique_id" />
              <ContainedButtons />
            </Toolbar>
          </Header>
          <DrawerSidebar sidebarId="unique_id">
            <SidebarContent>
              <SideBarCard />
              <SimpleList />
            </SidebarContent>
            <CollapseBtn />
          </DrawerSidebar>
          <Content>
            <OpenMap />
          </Content>
        </>
      )}
    </Root>
  );
};

export default Dashboard;
