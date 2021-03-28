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

const useStyles = makeStyles({
  //TODO: From Theme?
  root: {
    minHeight: 210,
  },
  main: {
    backgroundColor: "#ffffff",
    height: "inherit",
  },
});

//class LocationCard extends React.Component {
//  render() {
export const LocationCard = (props) => { 

    //const { props } = this;
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
        //Preferable to set all true as default
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

    return (
      <Card className={classes.root}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {location.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {!props.isGeolocationEnabled ? (
                <div>{location.errorMsg.notEnabled}</div>
              ) : !props.isGeolocationAvailable ? (
                <div>{location.errorMsg.notAvailable}</div>
              ) : props.coords ? (
                <>
                  {location.display.degrees || location.display.decimals ? (
                    <LocationLatLong
                      display={location.display}
                      coords={props.coords}
                    />
                  ) : null}
                  {location.display.what3words ? (
                    <LocationThreeWords
                      display={location.display}
                      coords={props.coords}
                    />
                  ) : null}
                </>
              ) : null}
            </Typography>
          </CardContent>
        <CardActions>
          <Button size="medium" color="primary">
            Map
          </Button>
        </CardActions>
      </Card>
    );
//  }
}

export const LocationOpenSkyCard = OpenSky({ icao24: null })(LocationCard);

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(LocationCard);
