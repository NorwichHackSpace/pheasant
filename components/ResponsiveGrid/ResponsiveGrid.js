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
import CallCard, { CallCardTest } from "../CallCard/CallCard";
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
    ///
    this.cards = [ 
        //Note that setting a card {isDragable: false} doesn't make it static.
      	{ card: LocationGeoCard, options: { isDragable: true, isCloseable: false, } },
	{ card: LocationOpenSkyCard, props: {title:"Anglia One", icao24:"406f2b", style:{styles} } },
	{ card: LocationOpenSkyCard, props: {title:"Anglia Two", icao24:"406ca0", style:{styles} } }, 
	{ card: LocationOpenSkyCard, props: {title:"Watch Test", icao24:"", style:{styles} } },
	{ card: CallCard, props: { style:{styles} }, options: { isDragable: true, isCloseable: false, } },
	{ card: CallCardTest, props: { style:{styles} }, options: { isDragable: true, isCloseable: false, } }
    ];
    ////
    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
      displayedCards: this.cards.map( (obj, index) => ({i: index+1, ...obj}) ), //Add Index on first state
    };
  }

  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 3, md: 3, sm: 1, xs: 1, xxs: 1 },
      rowHeight: 250, //Was 300?
      isDraggable: true,
      draggableHandle: ".grid-drag-handle",
      containerPadding: '5',
    };
  }
  
  resetLayout() {
    this.setState({ 
    		displayedCards: this.cards.map( (obj, index) => ({i: index+1, ...obj}) ),
    		layouts: { 
		    "lg": [
		        { "w": 1, "h": 1, "x": 0, "y": 0, "i": "1", "moved": false, "static": false },
		        { "w": 1, "h": 1, "x": 1, "y": 0, "i": "2", "moved": false, "static": false },
			{ "w": 1, "h": 1, "x": 2, "y": 0, "i": "3", "moved": false, "static": false },
			{ "w": 1, "h": 1, "x": 0, "y": 1, "i": "4", "moved": false, "static": false },
		        { "w": 1, "h": 1, "x": 1, "y": 1, "i": "5", "moved": false, "static": false },
		        { "w": 1, "h": 1, "x": 2, "y": 1, "i": "6", "moved": false, "static": false }
		    ],
		    "xxs": [
        		{ "w": 1, "h": 1, "x": 0, "y": 0, "i": "1", "moved": false, "static": false },
		        { "w": 1, "h": 1, "x": 0, "y": 1, "i": "2", "moved": false, "static": false },
		        { "w": 1, "h": 1, "x": 0, "y": 2, "i": "3", "moved": false, "static": false },
		        { "w": 1, "h": 1, "x": 0, "y": 3, "i": "4", "moved": false, "static": false },
		        { "w": 1, "h": 1, "x": 0, "y": 5, "i": "5", "moved": false, "static": false },
		        { "w": 1, "h": 1, "x": 0, "y": 4, "i": "6", "moved": false, "static": false }
		    ],
		}	
     });
  }

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts);
    this.setState({ layouts });
    
    /*
     * BEHOLD THE MAGIC!
     * If you add cards or want to rearange the default layout, the easyiest way to edit the layout about is to uncomment
     * below. Then you can edit the layout in Chrome and copy + paste the layout code in above one you have done your last edit.
     */
    //console.log(layouts);
  }
  
  onRemoveItem(key) {
    console.log("removing", key);
    this.setState({ displayedCards: _.reject(this.state.displayedCards, { i : key }) });
  }
  
  createDraggable = (foo, options) => (WrappedComponent, WrappedProps) => {
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
    const defaultOptions = {
	isDragable: true,
     	isCloseable: true,
    };
    options = {...defaultOptions, ...options}
    let key = foo;
    return (
      <div key={key} style={panelWrapper}>
        <div style={panelControl.style} >
	        {options.isDragable ? (<DragIndicatorIcon className="grid-drag-handle" />) : null}
	        {options.isCloseable ? (<CloseIcon onClick={this.onRemoveItem.bind(this, key)} />) : null}
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
	
	{ this.state.displayedCards.map( (obj, index) => ( this.createDraggable(obj.i , obj.options )( obj.card , obj.props) ) ) }
	
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}
