
const jwt = require("jsonwebtoken");
const apiConstants = require("../utils/api-constants")

const auth = async (request, response, next) => {
    const authHeader = request.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return response.status(apiConstants.CODES.UNAUTHORIZED).send({
            success: false,
            message: apiConstants.MESSAGES.GENERAL.UNAUTHORIZED_ACCESS,
        });
    }
    const token = authHeader.split(' ')[1]
    
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        request.user = payload;
        next()
    } catch (error) {
        return response.status(apiConstants.CODES.UNAUTHORIZED).send({
            success: false,
            message: apiConstants.MESSAGES.GENERAL.UNAUTHORIZED_ACCESS,
        });
    }
}

module.exports = {
    auth,
}