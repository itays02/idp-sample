const express = require("express");
const {idp, sp} = require("../config");
const { getUser, createTemplateCallback } = require("./idp");

const router = express.Router();

router.get('/metadata', (req, res) => {
    res.header('Content-Type', 'text/xml').send(idp.getMetadata());
});

router.post("/login",  async (req, res, next)=> {
    const {email, password} = req.body
    try {
        const user = await getUser(email, password)
        const parseResult = await idp.parseLoginRequest(sp, 'redirect', req)
        const {id, context} = await idp.createLoginResponse(sp, parseResult, 'post', user, createTemplateCallback(idp, sp, user));
        const originalHost = 'http://localhost:4000/'
        res.send(`${originalHost}user?SAMLResponse=${context}`)
    } catch (err) {
        console.log(err);
        next(err)
    }
});

module.exports = router;
