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

  return `${startTime} - ${endTime}`
}