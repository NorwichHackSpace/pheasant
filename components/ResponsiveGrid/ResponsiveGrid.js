import React from "react";
import PropTypes from "prop-types";
import { WidthProvider, Responsive } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import { getFromLS, saveToLS } from "../LocalStorage/LocalStorage"
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";
//Components
import LocationGeoCard, { LocationOpenSkyCard  } from "../Locations/LocationCard";
import CallCard, { CallCardTest } from "../CallCard/CallCard";
//Icons
import LayersClearIcon from '@material-ui/icons/LayersClear';
import CloseIcon from '@material-ui/icons/Close';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

const styles = {
  root: {},
  main: {
    backgroundColor: "#ffffff",
    height: "inherit",
  },
  panelControl: {
    position: 'absolute',
    cursor: "pointer",
    right: '0px',
    //'background-color': 'yellow', 
  },
  panelWrapper: {
    	 //'background-color': 'red',
  },
  hiddenIcon: {
    visibility: 'hidden',
  },
};

class ResponsiveLocalStorageLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    ///
    this.cards = [
        /* 
         * This is only used on first page, or when the user clicks the 'reset layout' button.
         * Also note that setting a card {isDragable: false} doesn't make it static.
         */
      	{ card: LocationGeoCard, options: { isDragable: true, isCloseable: false, } },
//	{ card: LocationOpenSkyCard, props: {title:"Anglia One", icao24:"406f2b", style:{styles} } },
//	{ card: LocationOpenSkyCard, props: {title:"Anglia Two", icao24:"406ca0", style:{styles} } }, 
//	{ card: LocationOpenSkyCard, props: {title:"Lincs & Notts Air Ambulance", icao24:"40709d", style:{styles} } },
//	{ card: LocationOpenSkyCard, props: {title:"Scottish Air Ambulance", icao24:"406d68", style:{styles} } },
//	{ card: LocationOpenSkyCard, props: {title:"Watch Test", icao24:"", style:{styles} } },
	{ card: CallCard, props: { style:{styles} }, options: { isDragable: true, isCloseable: true, } },
	{ card: CallCardTest, props: { style:{styles} }, options: { isDragable: true, isCloseable: true, } }
    ];
    
    ////getFromLS("responsiveGridCards") || 
    let originalCards = getFromLS("responsiveGridCards") || this.cards.map( (obj, index) => ({i: index+1, ...obj}) ); //Add Index on first state;
    let originalLayouts = getFromLS("layouts") || { };
    this.state = {
      //layouts: JSON.parse(JSON.stringify(originalLayouts)),
      layouts: originalLayouts,
      displayedCards: originalCards, //Add Index on first state
    };
  }

  static get defaultProps() { //TODO: Put this up in the MUI styles
    return {
      className: "layout",
      cols: { lg: 3, md: 3, sm: 1, xs: 1, xxs: 1 },
      rowHeight: 225, //Was 300?
      isDraggable: true,
      draggableHandle: ".grid-drag-handle",
      containerPadding: '5',
    };
  }
  
  resetLayout() {
     let displayedCards = this.cards.map( (obj, index) => ({i: index+1, ...obj}) );
     let layouts = { 
		    "lg": [
		        { "w": 1, "h": 1, "x": 0, "y": 0, "i": "1", "moved": false, "static": false },
		        { "w": 1, "h": 1, "x": 1, "y": 0, "i": "2", "moved": false, "static": false },
			{ "w": 1, "h": 1, "x": 2, "y": 0, "i": "3", "moved": false, "static": false },
			{ "w": 1, "h": 1, "x": 0, "y": 1, "i": "4", "moved": false, "static": false },
		        { "w": 1, "h": 1, "x": 1, "y": 1, "i": "5", "moved": false, "static": false },
		        { "w": 1, "h": 1, "x": 2, "y": 1, "i": "6", "moved": false, "static": false }
		    ],
		    "xxs": [
        		{ "w": 1, "h": 1, "x": 0, "y": 0, "i": "1", "moved": false, "static": true },
		        { "w": 1, "h": 1, "x": 0, "y": 1, "i": "2", "moved": false, "static": false },
		        { "w": 1, "h": 1, "x": 0, "y": 2, "i": "3", "moved": false, "static": false },
		        { "w": 1, "h": 1, "x": 0, "y": 3, "i": "4", "moved": false, "static": false },
		        { "w": 1, "h": 1, "x": 0, "y": 5, "i": "5", "moved": false, "static": false },
		        { "w": 1, "h": 1, "x": 0, "y": 4, "i": "6", "moved": false, "static": false }
		    ],
		};	
     
    this.onLayoutChange("", layouts);
    this.onCardsChange(displayedCards)
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
  
  onCardsChange(displayedCards) {
    saveToLS("responsiveGridCards", displayedCards);
    let layouts= this.state.layouts;
    saveToLS("layouts", layouts);    
    this.setState({ displayedCards: displayedCards });  	
  }
  
  onRemoveItem(key) {
    console.log("removing", key);
    let displayedCards = _.reject(this.state.displayedCards, { i : key });
    this.onCardsChange(displayedCards);
  }
  
  createDraggable = (key, options) => (WrappedComponent, WrappedProps) => {

    if(typeof WrappedComponent == 'undefined') { 
    	WrappedComponent = this.cards[key-1].card ; 
    }
    
    const {classes} = this.props;
    const defaultOptions = {
	isDragable: true,
     	isCloseable: true,
    };
    options = {...defaultOptions, ...options}
    /* <CloseIcon className={hiddenIcon} /> */
    return (
      <div key={key} className={classes.panelWrapper}>
        <div className={classes.panelControl} >
	        {options.isDragable ? (<DragIndicatorIcon className="grid-drag-handle" />) : null}
	        {options.isCloseable ? (<CloseIcon onClick={ this.onRemoveItem.bind(this, key) } /> ) : null}
        </div>
        <WrappedComponent {...this.state} {...this.props} {...WrappedProps} />
      </div>
    );
  }
  
  render() {
    const {classes} = this.props;
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

export default withStyles(styles)(ResponsiveLocalStorageLayout); //'Higher-order component' method of injecting MaterialUI themeing.
