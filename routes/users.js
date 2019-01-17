var express = require('express');
var router = express.Router();
const {User} = require('../models/users');
/* GET users listing. */
//User.createUser('Polina','password',null);
router.get('/', function(req, res, next) {
  var users = {};
  User.findAll().then(us => {
    users += JSON.stringify(us)
  }).then(() => {
    res.json(users);
  });
});

module.exports = router;
