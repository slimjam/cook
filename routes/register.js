var express = require('express');
var router = express.Router();
const {User} = require('../models/users');
var i18n = require('../i18n');

router.post('/', function (req, res, next) {
    const sall = null;

    var user = User.createUserWithProfile(
        req.body.email,
        req.body.password,
        sall,
        req.body.name,
        req.body.surname,
        req.body.age,
        req.body.lang,
        req.body.theme);

    if(user.message){
        return res.json({
            message: user.message,
            success: false
        });
    }
    else {
        return res.json({
            message: i18n.__('Registration successful. Check your email!'),
            success: true
        });
    }
});

module.exports = router;
