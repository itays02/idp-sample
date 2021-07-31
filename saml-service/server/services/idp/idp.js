const saml = require('samlify')
const { v4: uuidv4 } = require('uuid')
const { getUserFromJson } = require("./helpers/helper")

const { binding } = saml.Constants.namespace

const getUser = async (email, password) => {
    try {
        const user = await getUserFromJson(email, password)
        if (!user) {
            throw new Error('failed to get user')
        } else {
            return user
        }
    } catch (err) {
        console.log('error in fetching user details', err)
        throw new Error('error in fetching user details')
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
        attrUid: user.id,
        attrName: user.name,
        attrRole: user.role,
        attrRoles: "14",
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
