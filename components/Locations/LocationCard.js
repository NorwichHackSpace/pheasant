import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { geolocated, geoPropTypes } from "react-geolocated";

import LocationLatLong from "./LocationLatLong";
import LocationThreeWords from "./LocationThreeWords";

const useStyles = makeStyles({ //TODO: From Theme?
  root: {
    maxWidth: 345,
  },
  main: {
    backgroundColor: "#ffffff", 
    height: "inherit",
  },
});

class LocationCard extends React.Component {
//export default function LocationCard() {
render() {
  const classes = useStyles;
  const { props } = this;
  const locationDefaults = {
	title: "Your Location",
	coords: {
		latitude: 0.000,
		longitude: 0.000,
		altitude: 0, //Meters
	},
	display: { //Preferable to set all true as default
		degrees: true,
		decimals: true,
	}
	
  }
  
  let location = locationDefaults;

  if (!props.isGeolocationEnabled) {
	//<div>Your browser does not support Geolocation.</div>
  } else if (!props.isGeolocationAvailable) {
  	//<div>Geolocation is not enabled.</div>	
  } else if (props.coords) {
  	location.coords.latitude = props.coords.latitude;
  	location.coords.longitude = props.coords.longitude;
  	location.coords.altitude = props.coords.altitude;
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {location.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          
            <LocationLatLong display={location.display} coords={location.coords} />
            
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="medium" color="primary">
          Map
        </Button>
      </CardActions>
    </Card>
  );
 }
}

//LocationCard.propTypes = { ...LocationCard.propTypes, ...geoPropTypes };

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(LocationCard);

