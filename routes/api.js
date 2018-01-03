var express = require('express');
var router = express.Router();
var request = require('request');
var key = require('../apikey');

var api = {
  endpoint: "https://api.transport.nsw.gov.au/v1/live/hazards/",
  call: "incident/open"
};

var options = {
  url: api.endpoint + api.call,
  headers: {
    'Authorization': 'apikey ' + key.apikey
  }
};

/* GET live traffic data. */
router.get('/', function(req, res, next) {
  request(options, function(error, response, body) {
    if (error) {
      return console.log(error);
    }
    res.json(body);
  });
});

module.exports = router;
