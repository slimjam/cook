const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    //res.send('respond with a resource');
    console.log('catchhcchhch!1');
    const user ={ email: req.body.email, password: req.body.password};
    res.send(user);
});

router.post('/', function(req, res, next) {
    //res.send('respond with a resource');
    const user ={ email: req.body.email, password: req.body.password};
    console.log('catchhcchhch!2');
    res.send(user);
});


/* GET user profile. */
router.get('/profile', function(req, res, next) {
    const user ={ email: req.body.email, password: req.body.password};
    res.send(user);
});

module.exports = router;