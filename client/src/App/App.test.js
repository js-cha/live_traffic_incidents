import React from 'react';
import { render, shallow } from 'enzyme';
import App from './App';

describe('Test suite for App', () => {
  const mockData = [
    { id: 1, properties: {}, geometry: {} },
    { id: 2, properties: {}, geometry: {} },
    { id: 3, properties: {}, geometry: {} }
  ];

  global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({
      then: () => {
        return mockData;
      }
    })
  }));

  it('renders the title', () => {
    const wrapper = render(<App />);
    expect(wrapper.find('h1').text()).toBeTruthy();
  });

  it('should call the api at least once', () => {
    const component = shallow(<App />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});