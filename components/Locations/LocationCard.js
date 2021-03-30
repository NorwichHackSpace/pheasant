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
import { OpenSky } from "./LocationOpenSky";

//Icons
import MapRoundedIcon from '@material-ui/icons/MapRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 210,
  },
  main: {
    height: "inherit",
  },
}));

function useHasMounted() { //Hook for hydration
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => { setHasMounted(true); }, []);
  return hasMounted;
}

export const LocationCard = (props) => { 

    const hasMounted = useHasMounted();
    const classes = useStyles();

    const locationDefaults = {
      title: "Your Location",
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

    let location = { ...locationDefaults, ...props }; //Overwrite defaults with any given props

    let errorMsg = null; 
    if ( !hasMounted || !props.isGeolocationEnabled ) {
    	errorMsg = location.errorMsg.notEnabled;
    } else if ( !props.isGeolocationAvailable ) {
    	errorMsg = location.errorMsg.notAvailable;
    }

    return (
      <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {location.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {errorMsg}
            { props.coords ? 
            		(<span>
                  {location.display.degrees || location.display.decimals ? (
                    <LocationLatLong
                      display={location.display}
                      coords={props.coords}
                    />) : null} <br />
                  {location.display.what3words ? (
                    <LocationThreeWords
                      display={location.display}
                      coords={props.coords}
                    />) : null}
                </span>) : null}
            </Typography>
          </CardContent>
        <CardActions>
          	<Button startIcon={<MapRoundedIcon />}>
	            Map
	          </Button>
        </CardActions>
      </Card>
    );
}

export const LocationOpenSkyCard = OpenSky({ icao24: null })(LocationCard);

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(LocationCard);
