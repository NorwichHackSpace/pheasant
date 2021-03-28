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
    /* 
     * These 'default's are only used on first load, or when the user clicks the 'reset layout' button.
     */
    this.defaultLayouts = { 
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
    this.defaultCards = [ 
    	//Disabled the OpenSkyCards during Dev as they use a lot of API calls. ~Alan
      	{ card: LocationGeoCard, options: { isDragable: true, isCloseable: false, } },
	{ card: LocationOpenSkyCard, props: {title:"Anglia One", icao24:"406f2b", style:{styles} } },
	{ card: LocationOpenSkyCard, props: {title:"Anglia Two", icao24:"406ca0", style:{styles} } }, 
	{ card: LocationOpenSkyCard, props: {title:"Lincs & Notts Air Ambulance", icao24:"40709d", style:{styles} } },
	{ card: LocationOpenSkyCard, props: {title:"Scottish Air Ambulance", icao24:"406d68", style:{styles} } },
	{ card: LocationOpenSkyCard, props: {title:"Watch Test", icao24:"", style:{styles} } },
	{ card: CallCard, props: { style:{styles} }, options: { isDragable: true, isCloseable: true, } },
	{ card: CallCardTest, props: { style:{styles} }, options: { isDragable: true, isCloseable: true, } }
    ];
    
    /*
     * TODO:
     * Here we automaticly generate an index for each of the cards, so that we can save the layout and cards display.
     * This generally works great for lazy adding of new cards at the end of the list. 
     * But wait! If a card is removed (or a card is inserted in the middle of the list,) the indexes change!
     * So then a users saved layout index for a certain card now points to a different card.
     * We can choose to fix this by either 
     *   a) Forcfully resetting all users to the default layout when the card list changes. This makes sure they notice the card changes.
     *   b) Changing the code so we have to manually assign an index, while making sure users storage of layouts remove now invalid indexes.
     */
    let cards = getFromLS("displayedCards") || this.defaultCards.map( (obj, index) => ({i: index+1, ...obj}) );

    let layouts = getFromLS("displayedLayouts") || this.defaultLayouts ;
    this.state = {
      displayedLayouts: layouts,
      displayedCards: cards, //Add Index on first state
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
    let displayedCards = this.defaultCards.map( (obj, index) => ({i: index+1, ...obj}) );
    this.onLayoutChange("", this.defaultLayouts);
    this.onCardsChange(displayedCards)
  }

  onLayoutChange(layout, layouts) {
    saveToLS("displayedLayouts", layouts);
    this.setState({ displayedLayouts: layouts });
    /*
     * BEHOLD THE MAGIC!
     * If you add cards or want to rearange the default layout, the easyiest way to edit the layout about is to uncomment
     * below. Then you can edit the layout in Chrome and copy + paste the layout code in above one you have done your last edit.
     */
    //console.log(layouts);
  }
  
  onCardsChange(displayedCards) {
    saveToLS("displayedCards", displayedCards);
    this.setState({ displayedCards: displayedCards });  	
  }
  
  onRemoveItem(key) {
    let displayedCards = _.reject(this.state.displayedCards, { i : key });
    this.onCardsChange(displayedCards);
  }
  
  createDraggable = (key, options) => (WrappedComponent, WrappedProps) => {

    if(typeof WrappedComponent == 'undefined') { //We can't store the function in JSON-based storage, so recall it by ref
    	WrappedComponent = this.defaultCards[key-1].card ; 
    }
    const {classes} = this.props;
    const defaultOptions = {
	isDragable: true,
     	isCloseable: true,
    };
    options = {...defaultOptions, ...options}
    /* 
     * TODO:
     * In terms of MUI, having a hidden icon <CloseIcon className={hiddenIcon} /> 
     * instead of 'null' might make sense. Or not. Delete or change when/if decided.
     */
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
          layouts={this.state.displayedLayouts}
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
