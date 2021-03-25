import React from "react";
import * as What3Words from "@what3words/api"; 
import getConfig from "next/config";

export default class LocationLatLong extends React.Component {
  constructor() {
  	super();
  	this.state = { w3wText: null };
  	this.isCurrentlyMounted = false;
  }
  
  
  callAPI = () => {
	if (this.isCurrentlyMounted) {
	  	const location = this.props;
	  	if ( (this.lastLat == null && this.lastLon == null) || (location.coords.latitude !== this.lastLat && location.coords.longitude !== this.lastLon)) 
	  	{
		  	const { publicRuntimeConfig } = getConfig();
			What3Words.setOptions({ key: publicRuntimeConfig.what3wordsToken }) ;
			What3Words.convertTo3wa({ lat: location.coords.latitude, lng: location.coords.longitude})
			.then( res => { 
				//if ( res.country == "GB" ) {
					this.lastLat = location.coords.latitude, this.lastLon = location.coords.longitude;
					this.setState({ w3wText: res.words });
				//}
			} ) ;
	 	}
            }
  }
  
  componentDidMount() {
	this.isCurrentlyMounted = true;
	this.callAPI();
  }
  
  componentWillUnmount() {
	this.isCurrentlyMounted = false;
  }
  
  render() {
	this.callAPI();
	return ( (this.state.w3wText !== null ?
		<div>
			<span className="coordinate" color="secondary">///</span>
			<span className="coordinate">{this.state.w3wText}</span>
		</div> 
		 : null ) );
  }
}

/*
export { W3W_REGEX } from './constants';
export { autosuggest } from "./requests/autosuggest";
export { autosuggestSelection } from "./requests/autosuggest-selection";
export { availableLanguages } from "./requests/available-languages";
export { convertTo3wa, convertTo3waGeoJson } from "./requests/convert-to-3wa";
export { convertToCoordinates, convertToCoordinatesGeoJson, } from "./requests/convert-to-coordinates";
export { gridSection, gridSectionGeoJson, } from "./requests/grid-section";
export { setOptions, getOptions, getWords, valid3wa } from "./utils";
*/
