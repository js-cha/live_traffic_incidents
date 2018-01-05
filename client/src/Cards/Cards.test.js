import React from 'react';
import { mount } from 'enzyme';
import Cards from './Cards';

const mockProps = [
  {
    id: 1,
    properties: {
      displayName: "ACCIDENT Car",
      created: 1514986098977,
      start: null,
      end: null,
      attendingGroups: ["Emergency service(s)"],
      mainCategory: "Accident",
      otherAdvice: " ",
      roads: [
        {
          mainStreet: "York Road",
          crossStreet: "Syd Einfeld Drive",
          suburb: "Bondi Junction",
          locationQualifier: "at",
          secondLocation: " ",
          impactedLanes: [
            {
              affectedDirection: "Both directions"
            }
          ]
        }
      ]
    },
    geometry: {
      coordinates: ['-33.8688', '151.2093']
    }
  }
];

describe('Test suite for Cards', () => {
  it('should render cards', () => {
    const wrapper = mount(<Cards data={mockProps} />);
    expect(wrapper.find('.card').length).toEqual(1);
  });

  it('should render the same number of cards as data array length', () => {
    const wrapper = mount(<Cards data={mockProps} />);
    expect(wrapper.find('.card').length).toEqual(mockProps.length);
  });

  it('should load content loader when waiting for data', () => {
    const wrapper = mount(<Cards loaded={false}  />);
    expect(wrapper.find('svg').length).toEqual(1);
  });

  it('should load content after receiving data', () => {
    const wrapper = mount(<Cards loaded={false}  />);
    expect(wrapper.find('.card').length).toEqual(0);
    wrapper.setProps({data: mockProps, loaded: true});
    expect(wrapper.find('.card').length).toEqual(1);
  });
});