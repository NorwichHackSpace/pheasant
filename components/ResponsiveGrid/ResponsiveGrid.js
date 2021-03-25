import React from "react";
import PropTypes from "prop-types";
import { WidthProvider, Responsive } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};
import { getFromLS, saveToLS } from "../LocalStorage/LocalStorage"
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
//Components
import LocationGeoCard, { LocationOpenSkyCard  } from "../Locations/LocationCard";
//Icons
import LayersClearIcon from '@material-ui/icons/LayersClear';
import CloseIcon from '@material-ui/icons/Close';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

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
      //cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 200, //Was 300?
      isDraggable: true,
      draggableHandle: ".grid-drag-handle",
      containerPadding: '5',
    };
  }
  
  resetLayout() {
    this.setState({ layouts: {} });
  }

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts);
    this.setState({ layouts });
  }
  
  onRemoveItem(key) {
    console.log("removing", key);
    this.setState({ items: _.reject(this.state.items, { key: key }) });
  }
  
  createDraggable = (key , props) => (WrappedComponent, WrappedProps) => {
    const panelControl = {
      style: {
	      position: 'absolute',
	      cursor: "pointer",
	      right: '0px', 
      }
    };
    const panelWrapper = {
    	style: {
    	}
    };
    const defaultProps = {
	isDragable: true,
     	isCloseable: true,
    };
    props = {...defaultProps, ...props}
    return (
      <div key={key} style={panelWrapper}>
        <div style={panelControl.style} >
	        {props.isDragable ? (<DragIndicatorIcon className="grid-drag-handle" />) : null}
	        {props.isCloseable ? (<CloseIcon onClick={this.onRemoveItem.bind(this, key)} />) : null}
        </div>
        <WrappedComponent {...this.state} {...this.props} {...WrappedProps} />
      </div>
    );
  }
  
  render() {
    return (
      <div>
        <button onClick={() => this.resetLayout()}><LayersClearIcon /></button>
        <ResponsiveReactGridLayout
          {...this.props}
          layouts={this.state.layouts}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
	{ this.createDraggable(1, {isCloseable: false,})(LocationGeoCard) }		
	{ this.createDraggable(2)(LocationOpenSkyCard, {title:"Anglia One", icao24:"406f2b", style:{styles} }) } 
	{ this.createDraggable(3)(LocationOpenSkyCard, {title:"Anglia Two", icao24:"406ca0", style:{styles} }) } 
	{ this.createDraggable(4)(LocationOpenSkyCard, {title:"Watch Test", icao24:"", style:{styles} }) } 
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}
