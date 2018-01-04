import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { convertUnixTime, getTimeFrame, isNotEmpty, attendingGroups, affectedTraffic } from '../utils/utils';

const Cards = props => {
  const CardList = props.data.map(function(currItem, index, array) {
    /*
    ** A lot of data transformation and checking for empty values.
    */
    const allProps = currItem.properties;
    const roadProps = allProps.roads[0];
    const startedAt = `Started today at: ${convertUnixTime(allProps.created).toLocaleTimeString('en-US')}`;
    const timeframe = getTimeFrame(allProps.start, allProps.end) || startedAt;
    const aGroups = attendingGroups(allProps.attendingGroups);
    const aTraffic = affectedTraffic(roadProps);
    const coords = {
      lat: currItem.geometry.coordinates[1],
      lng: currItem.geometry.coordinates[0]
    };

    return (
      <div
        key={index}
        className="hazards__hazard"
      >
        <div>
          <strong>{roadProps.suburb}</strong>, {roadProps.mainStreet} <em>{roadProps.locationQualifier}</em>{' '}
          {roadProps.crossStreet} {isNotEmpty(roadProps.secondLocation) ? `and ${roadProps.secondLocation}` : ''}
        </div>
        <div>
          <div>{allProps.displayName}</div>
          {aTraffic}
          {aGroups}
          <div>{ReactHtmlParser(allProps.otherAdvice)}</div>
        </div>
        <div>
          {timeframe}
        </div>
      </div>
    );
  });

  return (
    <div className="hazards">
      {CardList}
    </div>
  );
};

Cards.propTypes = {
  data: PropTypes.array
};

export default Cards;
