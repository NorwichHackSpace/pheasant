import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
const qs = require('querystring');

export const OpenSky = ({
    suppressLocationOnMount = false,
    watchPosition = false,
    endpoint = 'https://opensky-network.org/api/states/all',
    defaults = {
    	time: null, //Current time is used if omitted  
	lamin: null, //lower bound for the latitude in decimal degrees
	lomin: null, //lower bound for the longitude in decimal degrees
	lamax: null, //upper bound for the latitude in decimal degrees
	lomax: null, //upper bound for the longitude in decimal degrees
    },
}) => (WrappedComponent) => {
    let result = class OpenSky extends Component {
        isCurrentlyMounted = false;
        state = {
            coords: null,
            isGeolocationAvailable: false,
            isGeolocationEnabled: false,
            errorMsg: {
            	notAvailable: "Aircraft is on the ground.",
            	notEnabled: "Finding aircraft...",
            }
        };

        onPositionError = () => {
            if (this.isCurrentlyMounted) {
                this.setState({
                    coords: null,
                    isGeolocationEnabled: true,
                    isGeolocationAvailable: false,
                });
            }
        };

        onPositionSuccess = (response) => {
    	    const aircraft = { //https://opensky-network.org/apidoc/rest.html#all-state-vectors
    	    		icao24: response.states[0][0], //Unique ICAO 24-bit address of the transponder 
    	    		callsign: response.states[0][1], //Callsign of the vehicle. Can be null if no callsign has been received.
    	    		origin_country: response.states[0][2], //Country name inferred from the ICAO 24-bit address.
			time_position: response.states[0][3], //Unix timestamp (seconds) for the last position update. Can be null if no position report was received by OpenSky within the past 15s.
			last_contact: response.states[0][4], //Unix timestamp (seconds) for the last update in general. This field is updated for any new, valid message received from the transponder.
			longitude: response.states[0][5], //WGS-84 longitude in decimal degrees. Can be null.
			latitude: response.states[0][6], //WGS-84 latitude in decimal degrees. Can be null.
			baro_altitude: response.states[0][7], //Barometric altitude in meters. Can be null.
			on_ground: response.states[0][8], //Boolean value which indicates if the position was retrieved from a surface position report.
			velocity: response.states[0][9], //Velocity over ground in m/s. Can be null.
			true_track: response.states[0][10], //True track in decimal degrees clockwise from north (north=0°). Can be null.
			vertical_rate: response.states[0][11], //Vertical rate in m/s. A positive value indicates that the airplane is climbing, a negative value indicates that it descends. Can be null.
			sensors: response.states[0][12], //IDs of the receivers which contributed to this state vector. Is null if no filtering for sensor was used in the request.
			geo_altitude: response.states[0][13], //Geometric altitude in meters. Can be null.
			squawk: response.states[0][14], //The transponder code aka Squawk. Can be null.
			spi: response.states[0][15], //Whether flight status indicates special purpose indicator.
			position_source: response.states[0][16], //Origin of this state’s position: 0 = ADS-B, 1 = ASTERIX, 2 = MLAT
    	    }
            if (this.isCurrentlyMounted) {
                this.setState({
                    coords: { 
				latitude: aircraft.latitude ,
				longitude: aircraft.longitude,
				altitude: aircraft.on_ground ? null : aircraft.baro_altitude ,
		     },
                    isGeolocationEnabled: true,
                    isGeolocationAvailable: true,
                    positionError: null,
                });
            }
        };

        getLocation = () => {
            const options = { //props probably has stuff we don't want to pass to URL
            	icao24: this.props.icao24,
            }
            if ( !options.icao24 ) {
                   this.setState({ errorMsg: { notEnabled: "No aircraft ID.", }, }) ;
            } else {

	            const url = endpoint + '?' + qs.stringify({ ...defaults, ...options })
		    axios.get(url, {
			mode: 'cors',
			redirect: 'follow',
			headers: {},
			referrer: 'no-referrer',
			referrerPolicy: 'no-referrer',
		    }).then( resp => {
	 	        if ( resp.data.states == null || !Array.isArray(resp.data.states) ) { this.onPositionError(); }
	 	        else { this.onPositionSuccess(resp.data); }; 	        
                   });
             }  
        };

        componentDidMount() {
            this.isCurrentlyMounted = true;
            if (!suppressLocationOnMount) {
                this.getLocation();
            }
        }

        componentWillUnmount() {
            this.isCurrentlyMounted = false;
            if (watchPosition) {
                geolocationProvider.clearWatch(this.watchId);
            }
        }

        render() {
            return <WrappedComponent {...this.state} {...this.props} />;
        }
    };
    //result.title = this.props.aircraftname + " Location"; //ERROR: this is undefined here
    result.propTypes = {
        onError: PropTypes.func,
        onSuccess: PropTypes.func,
    };
    return result;
};

export const OpenskyPropTypes = {
    coords: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        altitude: PropTypes.number,
        accuracy: PropTypes.number,
        altitudeAccuracy: PropTypes.number,
        heading: PropTypes.number,
        speed: PropTypes.number,
    }),
    isGeolocationAvailable: PropTypes.bool,
    isGeolocationEnabled: PropTypes.bool,
    positionError: PropTypes.shape({
        code: PropTypes.oneOf([1, 2, 3]),
        message: PropTypes.string,
    }),
    watchPosition: PropTypes.bool,
};
