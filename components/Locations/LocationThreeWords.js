import React from "react";
import * as What3Words from "@what3words/api"; 
import getConfig from "next/config";

export default class LocationLatLong extends React.Component {
  constructor() {
  	super();
  	this.state = { w3wText: null };
  }
  
  componentDidMount() {
  	const location = this.props;
	const { publicRuntimeConfig } = getConfig();
	What3Words.setOptions({ key: publicRuntimeConfig.what3wordsToken }) ;
	What3Words.convertTo3wa({ lat: location.coords.latitude, lng: location.coords.longitude})
		.then( res => { 
			if (res.country == "GB") {
				this.setState({ w3wText: res.words });
			}
		} ) ;
  }
  
  render() {
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
