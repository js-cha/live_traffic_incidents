import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import ContentLoader from 'react-content-loader'
import { convertUnixTime, getTimeFrame, isNotEmpty, attendingGroups, affectedTraffic } from '../utils/utils';
import './Cards.css'

const MyLoader = () => <ContentLoader type="facebook" />

const Cards = props => {
  if (props.loaded === false) {
    return <MyLoader />
  }

  const CardList = props.data.map(function(currItem, index, array) {
    const allProps = currItem.properties;
    const roadProps = allProps.roads[0];
    const startedAt = `Started today at: ${convertUnixTime(allProps.created).toLocaleTimeString('en-US')}`;
    const timeframe = getTimeFrame(allProps.start, allProps.end) || startedAt;
    const aGroups = attendingGroups(allProps.attendingGroups);
    const aTraffic = affectedTraffic(roadProps);
    const OtherAdvice = () => <div className="hazard__otherinfo">{ReactHtmlParser(allProps.otherAdvice)}</div>
    const coords = {
      lat: currItem.geometry.coordinates[1],
      lng: currItem.geometry.coordinates[0]
    };

    return (
      <div
        key={index}
        className="card"
      >
        <div className="card__inner">
          <div className="card__title">
            <strong>{roadProps.suburb}</strong>, {roadProps.mainStreet} <em>{roadProps.locationQualifier}</em>{' '}
            {roadProps.crossStreet} {isNotEmpty(roadProps.secondLocation) ? `and ${roadProps.secondLocation}` : ''}
          </div>
          <div className="card__information">
            <div className="card__description">{allProps.displayName}</div>
            {aTraffic}
            {aGroups}
            {isNotEmpty(allProps.otherAdvice) ? <OtherAdvice /> : ''}
          </div>
        </div>
        <div className="card__misc">
          {timeframe}
          <div className="card__misc__clickhandler" onClick={() => props.clickHandler(coords)}>
            View on map
          </div>
        </div>
      </div>
    );
  });

  return [...CardList];
};

Cards.propTypes = {
  data: PropTypes.array,
  loaded: PropTypes.bool,
  clickHandler: PropTypes.func
};

export default Cards;
