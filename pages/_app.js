import React, { useState } from "react";
import getConfig from "next/config";
import PropTypes from "prop-types";
import Head from "next/head";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import { ThemeProvider } from "@material-ui/styles";
import ThemeProvider from "../theme";
import ThemeContext from "../theme/ThemeContext";
import DashboardLayout from "../layouts/Dashboard/Dashboard";
import { getFromLS } from "../components/LocalStorage/LocalStorage"

export default function MyApp(props) {
  const { publicRuntimeConfig } = getConfig();
  const { Component, pageProps } = props;
  let state = getFromLS("theme") || publicRuntimeConfig.defaultTheme;
  const [theme, setTheme ] = useState( state ) ;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider>
        <Head>
          <title>{publicRuntimeConfig.title} </title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
