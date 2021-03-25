import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";

import CloseIcon from '@material-ui/icons/Close';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import LocationCard from "../Locations/LocationCard";
// import styles from "./styles.css";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */

const useStyles = makeStyles({
  //TODO: From Theme?
});
 
export default class AddRemoveLayout extends React.Component {

  static defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100,
    isDraggable: true,
    draggableHandle: ".grid-drag-handle",
    containerPadding: '0',
  };

  constructor(props) {
    super(props);
   
    this.state = {
      items: [0, 1, 2, 3, 4].map(function (i, key, list) {
        return {
          i: i.toString(),
          x: i * 2,
          y: 0,
          w: 2,
          h: 2,
        };
      }),
      newCounter: 0,
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  createElement(el) {
    const panelTitle = {
      position: 'absolute',
      cursor: "pointer",
      right: '0px', 
    };
    const panelWrapper = {
    };
    const i = el.i;

    return (
      <div key={i} data-grid={el} style={panelWrapper}>
        <div style={panelTitle} >
	        <DragIndicatorIcon className="grid-drag-handle" />
	        <CloseIcon onClick={this.onRemoveItem.bind(this, i)} />
        </div>
        <LocationCard style={this.props.styles} className="remove"
         />
      </div>
    );
  }

  onAddItem() {
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: this.state.newCounter.toString(),
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2,
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1,
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols,
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
    this.setState({ layout: layout });
  }

  onRemoveItem(i) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  render() {
    // const classes = useStyles();
    return (
      <div>
        <button onClick={this.onAddItem}>Add Item</button>
        <ResponsiveReactGridLayout
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          {...this.props}
        >
          {_.map(this.state.items, (el) => this.createElement(el))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}
