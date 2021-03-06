import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import PropTypes from 'prop-types';

const MapWithAMarker = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap
        defaultZoom={props.defaultZoom}
        defaultCenter={props.defaultCenter}
        center={props.coords}
        zoom={props.zoom}
      >
        {props.data.map(incident =>
          <Marker
            key={incident.id.toString()}
            position={{
              lat: incident.geometry.coordinates[1],
              lng: incident.geometry.coordinates[0]
            }}
          />
        )}
      </GoogleMap>
    );
  })
);

MapWithAMarker.propTypes = {
  googleMapURL: PropTypes.string,
  loadingElement: PropTypes.element,
  containerElement: PropTypes.element,
  mapElement: PropTypes.element,
  data: PropTypes.array,
  defaultCenter: PropTypes.object,
  defaultZoom: PropTypes.number,
  coords: PropTypes.object,
  zoom: PropTypes.number
};

export default MapWithAMarker;
