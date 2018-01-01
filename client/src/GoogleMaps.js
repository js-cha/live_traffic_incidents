import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={props.data}
  >
    <Marker
      position={{ lat: -34.397, lng: 150.644 }}
    />
    <Marker
      position={props.data}
    />
  </GoogleMap>
));

export default MapWithAMarker;