const saml = require('samlify');
const fs = require('fs');
const path = require("path");
const validator = require('@authenio/samlify-xsd-schema-validator');
saml.setSchemaValidator(validator);
const { binding } = saml.Constants.namespace

const { IdPService, ServiceProvider, SSOLogin, SSOLogout } = process.env

const sp = saml.ServiceProvider({
    entityID: `${ServiceProvider}/metadata`,
    assertionConsumerService: [{
        Binding: binding.post,
        Location: `${ServiceProvider}/acs`,
    }, {
        Binding: binding.redirect,
        Location: `${ServiceProvider}/acs`,
    }],
    signingCert:fs.readFileSync('certs/signing.cer'),
    loginRequestTemplate: fs.readFileSync(path.resolve(__dirname, "sp/loginRequestTemplate.xml")).toString(),
});

const idp = saml.IdentityProvider({
    entityID: `${IdPService}/metadata`,
    privateKey: fs.readFileSync('certs/idp.pem'),
    privateKeyPass: '1234',
    signingCert: fs.readFileSync('certs/signing.cer'),
    singleSignOnService: [{
        Binding: binding.post,
        Location: SSOLogin,
    },{
        Binding: binding.redirect,
        Location: SSOLogin,
    }],
    singleLogoutService: [{
        Binding: binding.post,
        Location: SSOLogout,
    },{
        Binding: binding.redirect,
        Location: SSOLogout,
    }],
    loginResponseTemplate:{
        context: fs.readFileSync(path.resolve(__dirname, "idp/loginResponseTemplate.xml")).toString(),
        attributes: [
            { name: 'uid', valueTag: 'uid', nameFormat: 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic', valueXsiType: 'xs:string' },
            { name: 'name', valueTag: 'name', nameFormat: 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic', valueXsiType: 'xs:string' },
            { name: 'phone', valueTag: 'phone', nameFormat: 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic', valueXsiType: 'xs:string' },
            { name: 'city', valueTag: 'city', nameFormat: 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic', valueXsiType: 'xs:string' },
            { name: 'createdAt', valueTag: 'createdAt', nameFormat: 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic', valueXsiType: 'xs:string' },
        ],
    }
});

module.exports = { sp, idp }
