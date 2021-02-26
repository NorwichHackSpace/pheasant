import { Component } from "react";
import ReactMapGL from "react-map-gl";

class MapBox extends Component {
  state = {
    viewport: {
      width: "100vw",
      height: "100vh",
      latitude: 41.5868,
      longitude: -93.625,
      zoom: 13,
    },
  };

  render() {
    return (
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken="pk.eyJ1IjoidG9ieWNhdGxpbiIsImEiOiJja2xtdDh6b3gwY2c5Mm9xeXo4MTg4NjEzIn0.6ayr26hPZGDJoD7_JzvKxw"
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({ viewport })}
      />
    );
  }
}

export default MapBox;
