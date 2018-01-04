var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', express.static(path.join(__dirname, 'client/build')));

module.exports = router;
