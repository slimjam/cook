var express = require('express');
var router = express.Router();
const i18n = require('../i18n');
// var data = {};
// // force: true will drop the table if it already exists
// User.sync({force: false}).then(() => {
//     // Table created
//     return User.create({
//         userName: "6admin@gmail.com",
//         password: "1234",
//         salt: null
//     });
// }).then(() => {
//     User.sync({force: false});
// }).then(() => {
//     User
//         .findAll()
//         .then(users_db=>{
//             data += JSON.stringify(users_db);
//         });
//     router.get('/', function(req, res, next) {
//         res.json(data);
//         //res.render('index', { title: 'Express' });
//     });
//
// });
// User
//     .findAll()
//     .then(users_db=>{
//         data += JSON.stringify(users_db);
//     });
// router.get('/', function(req, res, next) {
//     res.json(data);
//   //res.render('index', { title: 'Express' });
// });
//const m = require('../models');
//const {User} = require('../models/users');

// User.sync().then(async () => {
//     await User.createUser('Andrey13', 'Oskyrco7',null);
//     await User.findOne({where: {userName: 'Andrey9'}}).then(andr => {
//         var a = JSON.stringify(andr);
//         router.get('/', function(req, res, next) {
//             res.json(a);
//         });
//     });
// });
router.get('/', function(req, res, next) {
    res.render('index', { title: i18n.__('Hi') });
});

//
// User.createUser('Andrey1', 'Oskyrco1',null).then(async () => {
//     await User.findOne({where: {userName: 'Andrey'}}).then(andr => {
//         var a = JSON.stringify(andr);
//         router.get('/', function(req, res, next) {
//             //res.json(data);
//             /*User.findOne({where: {userName: 'Andrey'}}).then(andr => {
//                 var a = JSON.stringify(andr);
//                 res.json(a);
//             });*/
//             res.json(a);
//         });
//     });
//     //router.get('/', function(req, res, next) {
//         //res.json(data);
//         /*User.findOne({where: {userName: 'Andrey'}}).then(andr => {
//             var a = JSON.stringify(andr);
//             res.json(a);
//         });*/
//       //  res.render('index', { title: 'Express' });
//     //});
// });

module.exports = router;
