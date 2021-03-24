import React from "react";

const getDirection = (degrees, isLongitude) =>
  degrees > 0 ? (isLongitude ? "E" : "N") : isLongitude ? "W" : "S";

const formatDegrees = (degrees, isLongitude) =>
  `${getDirection(degrees, isLongitude)} ${0 | degrees}° ${
    0 | (((degrees < 0 ? (degrees = -degrees) : degrees) % 1) * 60)
  }' ${0 | (((degrees * 60) % 1) * 60)}"`;

class LocationLatLong extends React.Component {
  render() {
    const location = this.props;
    return (
      <div>
        { location.display.degrees ? (
        	<>
	        <span className="coordinate">
	          {formatDegrees(location.coords.latitude, false)}
	        </span>
		{", "}
	        <span className="coordinate">
	          {formatDegrees(location.coords.longitude, true)}
	        </span><br />
	        </>
	   ) : null }
       { location.display.decimals ? (   
	   	<>
	        Lat:{" "}
        	<span className="coordinate">
	          {location.coords.latitude.toFixed(6)}
	        </span>
	        {", Lon:"}
	        <span className="coordinate">
	          {location.coords.longitude.toFixed(6)}
	        </span><br />
	        </>
	   ) : null }
       {location.coords.altitude ? (
          <span>
            Approximately {location.coords.altitude.toFixed(0)} meters above sea level
          </span>
        ) : null}
      </div>
    );
  }
}

export default LocationLatLong;

