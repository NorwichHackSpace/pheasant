import React, {
	Component,
	useState,
	useEffect
} from "react";
import {
	withStyles
} from "@material-ui/core/styles";
//
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
//
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
// import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
//Icons
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import SmsRoundedIcon from '@material-ui/icons/SmsRounded';

import { geolocated, geoPropTypes } from "react-geolocated";
import { OpenSky } from "../Locations/LocationOpenSky";

const styles = () => ({
	root: {
		minHeight: 350,
	},
	main: {
		backgroundColor: "#ffffff",
		height: "inherit",
	},
	naming: {
		'color': theme.palette.secondary.main,
	},
});


/*
 * This routine calculates the distance between two points. South latitudes are negative, 
 * east longitudes are positive.
 * 'M' is statute miles (default) , 'K' is kilometers , 'N' is nautical miles
 */
function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	} else {
		var radlat1 = Math.PI * lat1 / 180;
		var radlat2 = Math.PI * lat2 / 180;
		var theta = lon1 - lon2;
		var radtheta = Math.PI * theta / 180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180 / Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit == "K") {
			dist = dist * 1.609344;
		}
		if (unit == "N") {
			dist = dist * 0.8684;
		}
		return dist;
	}
};

//const LocalHospital = (props) => { 
class LocalHospital extends React.Component {
	constructor() {
		super();
		this.state = {
			hospitals: {}
		};
		this.isCurrentlyMounted = false;
	}

	getHospitals = () => {
		const location = this.props;
		if (this.isCurrentlyMounted && location.coords) {
			if ((this.lastLat == null && this.lastLon == null) ||
				(location.coords.latitude !== this.lastLat && location.coords.longitude !== this.lastLon)) {
				this.lastLat = location.coords.latitude, this.lastLon = location.coords.longitude;
				const that = this;
				fetch('json/hospitals.eaaa.json', {
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json'
						}
					})
					.then(function(response) {
						return response.json();
					})
					.then(function(hospitals) {
						hospitals.sort(function(a, b) {
							let aK = distance(location.coords.latitude, location.coords.longitude, a.Lat, a.Lon, "K");
							let bK = distance(location.coords.latitude, location.coords.longitude, b.Lat, b.Lon, "K");
							return aK - bK;
						})
						that.setState({
							hospitals: (hospitals.slice(0, 8)), //First array num and includes, second is last but doesn't include.
						});
					});
			}
		}
	}

	componentDidMount() {
		this.isCurrentlyMounted = true;
		this.getHospitals();
	}

	componentWillUnmount() {
		this.isCurrentlyMounted = false;
	}

	render() {
		const classes = {...this.props.classes, ...styles};
		
		let locationDefaults = {
				title: "Nearest Hospital",
				coords: {
					//Not used, getting direct from props
					latitude: 0.0,
					longitude: 0.0,
					altitude: 0, //Meters
				},
				errorMsg: {
					notEnabled: "Geolocation is not enabled.",
					notAvailable: "Your browser does not support Geolocation.",
				},
			},
			location = {
				...locationDefaults,
				...this.props
			};

		this.getHospitals();

		let errorMsg = null;
		if ( /* !hasMounted || */ !this.props.isGeolocationEnabled) {
			errorMsg = location.errorMsg.notEnabled;
		} else if (!this.props.isGeolocationAvailable) {
			errorMsg = location.errorMsg.notAvailable;
		}

		return (
			<Card className={classes.root}>
			 <CardContent>
			  <Typography gutterBottom variant="h5" component="h2">
			    {location.title}
			  </Typography>
			  <List component="hospitals" aria-label="main hospitals list">
			    	 {errorMsg}
			    	 {
		       		this.state.hospitals && this.state.hospitals.length>0 && this.state.hospitals.map((key,index)=>
		       		        <ListItem  key={index}>
          <ListItemText primary={key.Hospital} />
          <ListItemSecondaryAction>
               <IconButton edge="end" aria-label="delete" onClick={ ()=>{window.location = ("tel:07779331082"); } }>
	               <Tooltip title={"Will call Alan during Development! | " + key.Tel + " |" }>
        	         <PhoneRoundedIcon />
        	        </Tooltip>
               </IconButton>
               <IconButton edge="end" aria-label="delete" onClick={ ()=>{window.location = ('sms:07779331082?body=' + 'I was testing a SMS button for ' + key.Hospital + '. The number would of been ' + key.Tel ); }} >
	               <Tooltip title={"Will SMS Alan during Development! | " + key.Tel + " |" } >
        	         <SmsRoundedIcon />
        	        </Tooltip>
               </IconButton>
           </ListItemSecondaryAction>
        </ListItem>
        
		       		)}
			  </List>
			</CardContent>
		    </Card>
		);
	}
}

export const demoHospitals = OpenSky({
	icao24: null
})(LocalHospital);

export default geolocated({
	positionOptions: {
		enableHighAccuracy: false,
	},
	userDecisionTimeout: 5000,
})(LocalHospital);

/*

          <Typography variant="body2" color="textSecondary" component="p">
            Colney Lane Norwich NR4 7UY
          </Typography>
        </CardContent>
      <CardActions>
        <Tooltip title="Disabled during Dev">
	        <Button startIcon={<PhoneRoundedIcon />} aria-label="tel" >
	          01603 286286
	        </Button>
        </Tooltip>
        <Tooltip title="Disabled during Dev">
	        <Button startIcon={<SmsRoundedIcon />} aria-label="sms" >
	          Message
	        </Button>
        </Tooltip>
      </CardActions>
      
      
      
*/
