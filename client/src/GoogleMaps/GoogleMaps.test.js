import React from 'react';
import { mount } from 'enzyme';
import MapWithAMarker from './GoogleMaps';
import { Marker } from 'react-google-maps';

const props = {
  url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp',
  loadingElement: <div style={{ height: `100%` }} />
};

const { url, loadingElement } = props;

describe('Test suite for GoogleMaps', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<MapWithAMarker googleMapURL={url} loadingElement={loadingElement} />);
  });

  it('should render maps', () => {
    expect(wrapper.prop('googleMapURL')).toEqual(url);
  });
});
