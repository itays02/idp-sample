const express = require("express");
const router = express.Router();

router.use((req, res, next)=> {
    res.append('Access-Control-Allow-Origin', [req.headers.origin]);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    res.append('Access-Control-Allow-Credentials', 'true');
    res.append('Content-Type', 'application/json');

    next();
});

router.use('/idp', require('./idp'));
router.use('/sp', require('./sp'));

module.exports = router;
