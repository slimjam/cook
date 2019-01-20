const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
var Cookies = require('cookies')
/* POST login. */
router.post('/', function (req, res, next) {
    var keys = ['keyboard cat'];
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
            return res.json({
                message: info.message,
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
            var cookies = new Cookies(req, res, { keys: keys });
            //var tokenCookie = cookies.get('tokenCookie', { signed: true });

            // Set the cookie to a value
            cookies.set('tokenCookie', token, { signed: true });

            /*if (!tokenCookie) {
                res.setHeader('Content-Type', 'text/plain')
                res.end('Welcome, first time visitor!')
            } else {
                res.setHeader('Content-Type', 'text/plain')
                res.end('Welcome back! Nothing much changed since your last visit at ' + lastVisit + '.')
            }*/
            console.log(res.headers);
            return res.json({user, token}); // add to cookie
        });
    })(req, res);
});

module.exports = router;