import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { convertUnixTime, getTimeFrame, isNotEmpty, attendingGroups, affectedTraffic } from './utils';

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
      <Card
        key={index}
        className={allProps.mainCategory === 'Accident' ? 'hazard-accident' : ''}
        onClick={() => props.clickHandler(coords)}
      >
        <Card.Header>
          <strong>{roadProps.suburb}</strong>, {roadProps.mainStreet} <em>{roadProps.locationQualifier}</em>{' '}
          {roadProps.crossStreet} {isNotEmpty(roadProps.secondLocation) ? `and ${roadProps.secondLocation}` : ''}
        </Card.Header>
        <Card.Content className="extraPad">
          <Card.Header content={allProps.displayName} />
          <Card.Description>
            {aTraffic}
            {aGroups}
            {ReactHtmlParser(allProps.otherAdvice)}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {timeframe}
        </Card.Content>
      </Card>
    );
  });

  return (
    <Card.Group itemsPerRow={2} stackable>
      {CardList}
    </Card.Group>
  );
};

Cards.propTypes = {
  data: PropTypes.array
};

export default Cards;
