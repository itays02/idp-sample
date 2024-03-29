const saml = require('samlify')
const { v4: uuidv4 } = require('uuid')
const { getUserFromJson } = require("./helpers/helper")

const { binding } = saml.Constants.namespace

const getUser = async (email, password) => {
    const user = await getUserFromJson(email, password)
    if (!user) {
        throw new Error('user not found')
    } else {
        return user
    }
}

const createTemplateCallback = (idp, sp, user) => template => {
    const _id = uuidv4().hex
    const now = new Date();
    const spEntityID = sp.entityMeta.getEntityID();
    const idpSetting = idp.entitySetting;
    const fiveMinutesLater = new Date(now.getTime());
    fiveMinutesLater.setMinutes(fiveMinutesLater.getMinutes() + 5);
    const tvalue = {
        ID: _id,
        AssertionID: idpSetting.generateID ? idpSetting.generateID() : `${uuidv4()}`,
        Destination: sp.entityMeta.getAssertionConsumerService(binding.post),
        Audience: spEntityID,
        SubjectRecipient: spEntityID,
        NameIDFormat: 'urn:oasis:names:tc:SAML:demo.demo:nameid-format:emailAddress',
        NameID: user.email,
        Issuer: idp.entityMeta.getEntityID(),
        IssueInstant: now.toISOString(),
        ConditionsNotBefore: now.toISOString(),
        ConditionsNotOnOrAfter: fiveMinutesLater.toISOString(),
        SubjectConfirmationDataNotOnOrAfter: fiveMinutesLater.toISOString(),
        AssertionConsumerServiceURL: sp.entityMeta.getAssertionConsumerService(binding.post),
        EntityID: spEntityID,
        InResponseTo: '_4606cc1f427fa981e6ffd653ee8d6972fc5ce398c4',
        StatusCode: 'urn:oasis:names:tc:SAML:2.0:status:Success',
        attrId: user.id,
        attrName: user.name,
        attrCity: user.city,
        attrPhone: user.phone,
        attrCreatedAt: user.createdAt.toString(),
    };
    return {
        id: _id,
        context: saml.SamlLib.replaceTagsByValue(template, tvalue),
    };
};

module.exports = {
    getUser,
    createTemplateCallback
}
