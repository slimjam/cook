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

//const url = 'localhost:3000/signin';
const usersData = ['data'];
var axios = require('axios');
// let getData = () => {
//     axios.get(url)
//         .then(res => usersData.push(res.data))
//         .catch(err => console.log(err.data));
//     console.log(usersData);
// };
router.post('/', function(req, res, next) {
    //getData();
    //req.body.email:
    //User.createUserWithProfile('Ilya@mail.com','12345','abc','Ilya', 'Losik', 20);
    console.log('post');
    console.log(req.body.email);
    console.log(req.body);
    console.log(req.data);
    //console.log(req);
    res.json(usersData);
});
router.get('/', function(req, res, next) {
    //getData();
    //req.body.email:
    //User.createUserWithProfile('Ilya@mail.com','12345','abc','Ilya', 'Losik', 20);
    console.log('get');
    //console.log(req);
    console.log(req.body);
    console.log(res.data);
    //axios.get('http://localhost:3001/signin').then((response) => {
     //   console.log(response.data);
        //console.log(response.data);
    //});
    res.json(usersData);
});

router.options('/', function(req, res, next) {
    //getData();
    //req.body.email:
    //User.createUserWithProfile('Ilya@mail.com','12345','abc','Ilya', 'Losik', 20);
    // axios.get('http://localhost:3001/signin').then((response) => {
    //     console.log(response);
    //     //console.log(response.data);
    // });
    console.log('opt');
    // console.log(req.body.email);
    // console.log(req.body);
    // console.log(req.data);
    //console.log(req);
    res.json(usersData);
});


module.exports = router;
