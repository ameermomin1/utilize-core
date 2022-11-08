const niv = require("node-input-validator");
const Validator = niv.Validator;

const templates = {
    create_user: {
        firstname: 'required|string|maxLength:50',
        lastname: 'required|string|maxLength:50',
        email: 'required|email',
        password: 'required|maxLength:150',
    },
    login: {
        email: 'required|email',
        password: 'required|maxLength:150',
    },
    create_group:{
        groupName: 'required|string|maxLength:60',
    },
    update_group: {
        groupName: 'required|string',
        invites: 'array',
        uninvites: 'array',
    },
    create_message:{
        groupId: 'required|integer',
        message: 'required|string',
    }
}

const validateRequestInput = async (object, templateName) => {
    const validator = new Validator(object, templates[templateName]);
    const isValid = await validator.check();
    const resObj = { isValid };
    if (!isValid) {
      resObj.errors = v.errors;
    }
    return resObj;
};

module.exports = {
    validateRequestInput,
}
