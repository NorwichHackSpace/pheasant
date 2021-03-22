import React from "react";
import { geolocated, geoPropTypes } from "react-geolocated";

// API for live EAAA https://data-live.flightradar24.com/zones/fcgi/feed.js?reg=!G-RESU

const getDirection = (degrees, isLongitude) =>
  degrees > 0 ? (isLongitude ? "E" : "N") : isLongitude ? "W" : "S";

// addapted from http://stackoverflow.com/a/5786281/2546338
const formatDegrees = (degrees, isLongitude) =>
  `${0 | degrees}° ${
    0 | (((degrees < 0 ? (degrees = -degrees) : degrees) % 1) * 60)
  }' ${0 | (((degrees * 60) % 1) * 60)}" ${getDirection(degrees, isLongitude)}`;

class LocationFlightradar24 extends React.Component {
  render() {
    const { props } = this;
    return !props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation.</div>
    ) : !props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled.</div>
    ) : props.coords ? (
      <div>
        You are at{" "}
        <span className="coordinate">
          {formatDegrees(props.coords.latitude, false)}
        </span>
        ,{" "}
        <span className="coordinate">
          {formatDegrees(props.coords.longitude, true)}
        </span>
        {props.coords.altitude ? (
          <span>
            , approximately {props.coords.altitude} meters above sea level
          </span>
        ) : null}
        .
      </div>
    ) : (
      <div>Getting the location data&hellip;</div>
    );
  }
}

LocationLatLong.propTypes = { ...LocationLatLong.propTypes, ...geoPropTypes };

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(LocationLatLong);


const qs = require('querystring')
const {fetch} = require('fetch-ponyfill')({Promise: require('pinkie-promise')})
const parse = require('parse-jsonp')

const isObj = o => 'object' === typeof o && o !== null && !Array.isArray(o)

const endpoint = 'https://data-live.flightradar24.com/zones/fcgi/feed.js'
const headers = {
	'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36'
}

const defaults = {
	FAA: false, // use US/Canada radar data source
	FLARM: false, // use FLARM data source
	MLAT: false, // use MLAT data source
	ADSB: true, // use ADS-B data source
	inAir: true, // fetch airborne aircraft
	onGround: true, // fetch (active) aircraft on ground
	inactive: true, // fetch inactive aircraft (on ground)
	gliders: false, // fetch gliders
	estimatedPositions: false // if out of coverage
}

const request = (north, west, south, east, when, opt = {}) => {
	if ('number' !== typeof north) throw new Error('north must be a number')
	if ('number' !== typeof west) throw new Error('west must be a number')
	if ('number' !== typeof south) throw new Error('south must be a number')
	if ('number' !== typeof east) throw new Error('east must be a number')
	if (when && 'number' !== typeof when) throw new Error('when must be a number')
	opt = Object.assign({}, defaults, opt)

	const query = {
		bounds: [north, south, west, east].join(','),
		callback: 'jsonp',
		// options
		faa: opt.FAA ? '1' : '0',
		flarm: opt.FLARM ? '1' : '0',
		mlat: opt.MLAT ? '1' : '0',
		adsb: opt.ADSB ? '1' : '0',
		air: opt.inAir ? '1' : '0',
		gnd: opt.onGround ? '1' : '0',
		vehicles: opt.inactive ? '1' : '0',
		gliders: opt.gliders ? '1' : '0',
		estimated: opt.estimatedPositions ? '1' : '0'
		// todo: maxage, stats, history, prefetch
	}
	if (when) query.history = Math.round(when / 1000)

	const url = endpoint + '?' + qs.stringify(query)
	return fetch(url, {
		mode: 'cors',
		redirect: 'follow',
		headers,
		referrer: 'no-referrer',
		referrerPolicy: 'no-referrer'
	})
	.then((res) => {
		if (!res.ok) {
			const err = new Error(res.statusText)
			err.statusCode = res.status
			throw err
		}
		return res.text()
	})
	.then((jsonp) => {
		const data = parse('jsonp', jsonp)
		if (!isObj(data)) throw new Error('response data must be an object')

		const aircraft = []
		for (let id in data) {
			const d = data[id]
			if (!Array.isArray(d)) continue
			aircraft.push({
				id,
				registration: d[9] || null,
				flight: d[13] || null,
				callsign: d[16] || null, // ICAO ATC call signature
				origin: d[11] || null, // airport IATA code
				destination: d[12] || null, // airport IATA code
				latitude: d[1],
				longitude: d[2],
				altitude: d[4], // in feet
				bearing: d[3], // in degrees
				speed: d[5] || null, // in knots
				rateOfClimb: d[15], // ft/min
				isOnGround: !!d[14],
				squawkCode: d[6], // https://en.wikipedia.org/wiki/Transponder_(aeronautics)
				model: d[8] || null, // ICAO aircraft type designator
				modeSCode: d[0] || null, // ICAO aircraft registration number
				radar: d[7], // F24 "radar" data source ID
				isGlider: !!d[17],
				timestamp: d[10] || null
			})
		}

		return aircraft
	})
}

module.exports = request
