const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
/* POST login. */
router.post('/', function (req, res, next) {
    console.log(req.body);
    console.log('tut');
    //var user = req.body;
    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log('in it');
        //user = req.body;
        console.log('usr:' + user);
        if (err || !user) {
            console.log(err);
            console.log('bad');
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
        req.login(user, {session: false}, (err) => {
            console.log('dbus');
            console.log(user);
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
            console.log({user, token});
            return res.json({user, token});
        });
    })(req, res);
});

module.exports = router;