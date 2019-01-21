var express = require('express');
var router = express.Router();
const {User, UserRole} = require('../models/users');
/* GET users listing. */
//User.createUser('Polina','password',null);
router.get('/', function(req, res, next) {
  var users = [];
  User.findAll().then(us => {
    us.forEach( u => {
      UserRole.findOne({where:{user_id: u.id}}).then(role => {
        var user = {
          name: u.name,
          surname: u.surname,
          email: u.email,
          role: role.name
        };
        users.push(user);
      });
    } );
    }).then(() => { // nam sur log rol
    res.json(users);
  });
});

///////// delete
router.delete('/', function(req, res, next) {
  var users = req.body.users ? req.body.users : [];
  users.forEach(user => {
    user.deleteUser();
  });
  res.status(200).send();
});

module.exports = router;
