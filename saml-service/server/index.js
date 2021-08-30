const express = require("express");
const path = require("path");
const router = express.Router();

router.use((req, res, next)=> {
    res.append('Access-Control-Allow-Origin', [process.env.DemoURL]);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    res.append('Access-Control-Allow-Credentials', 'true');
    res.append('Content-Type', 'application/json');

    next();
});

router.use('/idp', require('./services/idp'));
router.use('/sp', require('./services/sp'));

module.exports = router;
