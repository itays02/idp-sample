const express = require("express");
const jwt = require('jsonwebtoken');
const fs = require('fs');

const { idp, sp }  = require('../config')
const router = express.Router();

router.get('/metadata', (req, res) => {
    res.header('Content-Type', 'text/xml').send(sp.getMetadata());
});

router.get('/', (req, res) => {
    const {id, context} = sp.createLoginRequest(idp, 'redirect')
    return res.redirect(context)
})

// parse when receive a SAML Response from IdP
router.post('/acs', async (req, res) => {
    try {
        const {SAMLResponse} = req.body
        const {extract} = await sp.parseLoginResponse(idp, 'post', {body: {SAMLResponse}});

        const user = {
            id: extract.attributes['id'],
            email: extract.nameID,
            name: extract.attributes['name'],
            city: extract.attributes['city'],
            phone: extract.attributes['phone'],
            createdAt: extract.attributes['createdAt'],
        };

        const privateKey = fs.readFileSync('certs/server.key')
        const signedJwt = jwt.sign(user, {key: privateKey, passphrase: '1234'}, {algorithm: 'RS256'})
        res.cookie('user', signedJwt, { maxAge: 2 * 60 * 60, httpOnly: true })
        res.sendStatus(200)
    } catch (error) {
        res.status(400).send(error.message || error)
    }
});

// parse jwt token to actual user
router.get('/user', async (req, res) => {
    try {
        const token = req.cookies['user']
        const cert = fs.readFileSync('certs/server.pem')
        res.send(jwt.verify(token, cert, { algorithm: 'RS256' }))
    } catch (error) {
        res.status(400).send(error.message || error)
    }
});

// parse jwt token to actual user
router.post('/logout', async (req, res) => {
    try {
        // const { id, context } = idp.createLogoutRequest(sp, 'redirect', { logoutNameID: req.body.email });
//        const { extract } = await sp.parseLogoutRequest(idp, 'redirect', { body: { SAMLRequest: context } });
        res.clearCookie('user');
        res.sendStatus(200)
    } catch (error) {
        res.status(400).send(error.message)
    }
});

module.exports = router;
