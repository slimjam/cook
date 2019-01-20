var Cookies = require('cookies');
var keys = ['keyboard cat'];

module.exports = function jwtToHeader(req, res, next) {
    var cookies = new Cookies(req, res, { keys: keys });
    var tokenCookie = cookies.get('tokenCookie', { signed: true });
    if (tokenCookie) {
        console.log('Cookie set successful to header');
        res.setHeader('Authorization', 'Bearer ' + tokenCookie);    //to req 
        next();
    }
    else {
        next();
    }
};