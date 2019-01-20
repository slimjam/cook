var Cookies = require('cookies');
var keys = ['keyboard cat'];

module.exports = function jwtToHeader(req, res, next) {
    var cookies = new Cookies(req, res, { keys: keys });
    var tokenCookie = cookies.get('tokenCookie', { signed: true });
    if (tokenCookie) {
        console.log('Cookie set successful to header');
        res.setHeader('authorization', tokenCookie);
        res.status(200).send(); // ??? send? header only to res?
    }
    else {
        next();
    }
};