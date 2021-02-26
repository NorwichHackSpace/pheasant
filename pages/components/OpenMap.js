import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { render } from "react-dom";

class OpenMap extends React.Component {
  state = {
    inBrowser: false,
  };

  componentDidMount() {
    this.setState({ inBrowser: true });
  }

  render() {
    if (!this.state.inBrowser) {
      return null;
    }

    return (
      <Container maxWidth="sm">
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </Container>
    );
  }
}
export default OpenMap;
// export default function OpenMap() {
//       state = {
//     inBrowser: false,
//   };

//   componentDidMount() {
//     this.setState({ inBrowser: true });
//   }
//   render(
//   return (
//     <Container maxWidth="sm">
//       <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
//         <TileLayer
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={position}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </Container>
//   );
//   )
// }
