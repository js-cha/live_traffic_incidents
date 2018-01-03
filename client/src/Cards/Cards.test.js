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
  let wrapper

  beforeEach(() => {
    wrapper = mount(<Cards data={mockProps} />);
  })

  it('should render cards group', () => {
    expect(wrapper.find('.cards').hasClass('stackable')).toEqual(true);
  });

  it('should render the same number of cards as props array length', () => {
    expect(wrapper.find('.card').length).toEqual(mockProps.length);
  });
});