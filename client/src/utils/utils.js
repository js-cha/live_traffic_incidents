import React from 'react';

export function convertUnixTime(ms) {
  const sanitize = ms.toString().substring(0, 10);
  const date = new Date(sanitize * 1000);
  return date;
}

export function getTimeFrame(start, end) {
  if (!start) {
    return false;
  }
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const startTime = convertUnixTime(start).toLocaleString('en-AU', options);
  const endTime = convertUnixTime(end).toLocaleString('en-AU', options);
  return `${startTime} - ${endTime}`;
}

export function isNotEmpty(val) {
  if (val !== undefined && val !== ' ' && val !== null) {
    return true;
  }
  return false;
}

export function attendingGroups(attGroups) {
  let groups = [];
  attGroups.forEach(val => {
    if (isNotEmpty(val)) {
      groups.push(val);
    }
  });
  const Markup = () =>
    <div className="card__otherinfo">
      Attending groups: {groups.join(', ')}
    </div>;
  return groups.length > 0 ? <Markup /> : '';
}

export function affectedTraffic(data) {
  let direction;
  if (data.impactedLanes[0]) {
    direction = data.impactedLanes[0].affectedDirection;
  }
  const Markup = () =>
    <div className="card__otherinfo">
      Affected direction: {direction}
    </div>;
  return isNotEmpty(direction) === true ? <Markup /> : '';
}

export function fetchData() {
  return fetch('/api')
          .then(response => response.json())
          .then(jsonString => {
            const json = JSON.parse(jsonString);
            return json;
          });
}

export function sortData(data) {
  let hazards = {
    accidents: [],
    ongoing: [],
    rest: []
  };

  data.features.map(obj => {
    if (obj.properties.mainCategory === 'Accident') {
      hazards.accidents.push(obj);
    } else if (isNotEmpty(obj.properties.start) && isNotEmpty(obj.properties.end)) {
      hazards.ongoing.push(obj);
    } else {
      hazards.rest.push(obj);
    }
    return false;
  });

  return hazards;
}