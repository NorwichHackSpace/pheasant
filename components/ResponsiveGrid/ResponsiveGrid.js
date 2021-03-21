import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import LayersClearIcon from '@material-ui/icons/LayersClear';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};
import LocationCard from "../LocationLatLong/LocationCard";

/**
 * This layout demonstrates how to sync multiple responsive layouts to localstorage.
 */

const styles = {
  main: {
    backgroundColor: "#ffffff",
    height: "inherit",
  },
};

export default class ResponsiveLocalStorageLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
    };
  }

  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 3, md: 3, sm: 1, xs: 1, xxs: 1 },
      rowHeight: 300,
    };
  }

  resetLayout() {
    this.setState({ layouts: {} });
  }

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts);
    this.setState({ layouts });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.resetLayout()}><LayersClearIcon /></button>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 3, md: 3, sm: 1, xs: 1, xxs: 1 }}
          rowHeight={300}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          <div key="a">
            <LocationCard style={styles} />
          </div>
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value,
      })
    );
  }
}
