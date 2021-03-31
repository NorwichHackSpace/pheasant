import React, { Component, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
//Icons
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import SmsRoundedIcon from '@material-ui/icons/SmsRounded';

import { geolocated, geoPropTypes } from "react-geolocated";
import { OpenSky } from "../Locations/LocationOpenSky";

const useStyles = makeStyles({
  root: {
    minHeight: 210,
  },  
  main: {
    backgroundColor: "#ffffff",
    height: "inherit",
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
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344; }
		if (unit=="N") { dist = dist * 0.8684; }
		return dist;
	}
};

const LocalHospital = (props) => { 

  const [hospitals,setData] = useState([]);
   
  const classes = useStyles();
  
  const locationDefaults = {
      title: "Nearest Hospital",
      coords: {
        //Not used, getting direct from props
        latitude: 0.0,
        longitude: 0.0,
        altitude: 0, //Meters
      },
      display: {
        degrees: true,
        decimals: true,
        what3words: true,
      },
      errorMsg: {
        notEnabled: "Geolocation is not enabled.",
        notAvailable: "Your browser does not support Geolocation.",
      },
    };
    var location = { ...locationDefaults, ...props };
    
    const getHospitals = (location) => {
    	    console.log("location", props);
    	    if (!props.coords) {return}
    	    console.log("LOCATION");
	    fetch('json/hospitals.eaaa.json'
	    ,{
	      headers : { 
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	       }
	    }
	    )
	      .then(function(response){
		return response.json();
	      })
	      .then(function(hospitals) {
	        let demoLocation = { lat: 52.529620, lon: 0.879145 }; //Stow Bedon, Norfolk
		hospitals.sort( function(a, b) {
			let aK = distance(props.coords.latitude, props.coords.longitude, a.Lat, a.Lon, "K");
			let bK = distance(props.coords.latitude, props.coords.longitude, b.Lat, b.Lon, "K");
			return aK - bK;
		})
		setData(hospitals.slice(0,5) ) //Start and includes, ends but doesn't.
	      });
	  }
	  useEffect(()=>{
	   getHospitals()
  },[])

  if(props.coords && !hospitals[1]) { getHospitals() }
  console.log(hospitals)
  
    let errorMsg = null; 
    if ( /* !hasMounted || */ !props.isGeolocationEnabled ) {
    	errorMsg = location.errorMsg.notEnabled;
    } else if ( !props.isGeolocationAvailable ) {
    	errorMsg = location.errorMsg.notAvailable;
    }
    
 return (
    <Card className={classes.root}>
         <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {location.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
	    	 {errorMsg}
	         {
       		hospitals && hospitals.length>0 && hospitals.map((key)=><p>{key.Hospital}</p>)
	     	 }
          </Typography>
        </CardContent>
    </Card>
  );
}


export const demoHospitals = OpenSky({ icao24: null })(LocalHospital);

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(LocalHospital);


/*


        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Norfolk and Norwich University Hospital
          </Typography>
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



