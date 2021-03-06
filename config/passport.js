const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('../models/users');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const i18n = require('../i18n')();

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, cb) {
        console.log('tutat mf');
        console.log(email);
        console.log(password);
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return User.findOne({where:{
            email: email,
            password: password}})
            .then(user => {
                console.log(email);
                console.log(password);
                console.log(user);
                if (!user) {
                    console.log('Incorrect email or password.');
                    return cb(null, false, {message: i18n.__('Incorrect email or password.')});
                }
                console.log('Logged In Successfully');
                return cb(null, user, {message: i18n.__('Logged In Successfully')});
            })
            .catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
        //jwtFromRequest: ExtractJWT.fromHeader('Authorization'),
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {
    console.log('momy fun');
    console.log(jwtPayload.id);
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return User.findById(jwtPayload.id)
            .then(user => {
                console.log(user);
                return cb(null, user);
            })
            .catch(err => {
                console.log(err);
                return cb(err);
            });
    }
));