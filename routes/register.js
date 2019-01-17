var express = require('express');
var router = express.Router();
const {User} = require('../models/users');
//const Profile = require('../models/profile');
// /* GET users listing. */
// User.createUser('Polina','password',null);
// router.get('/register', function(req, res, next) {
//     var users = {};
//     User.findAll().then(us => {
//         users += JSON.stringify(us)
//     }).then(() => {
//         res.json(users);
//     });
// });

// const url = 'localhost:4000/register';
const usersData = [];
// axios = require('axios');
// let getData = () => {
//     axios.get(url)
//         .then(res => usersData.push('data'))
//         .catch(err => console.log(err.data));
//     console.log(usersData);
// };
router.get('/', function(req, res, next) {
    //getData();
    User.createUserWithProfile('Ilya@mail.com','12345','abc','Ilya', 'Losik', 20);
    res.json(usersData);
});

module.exports = router;
