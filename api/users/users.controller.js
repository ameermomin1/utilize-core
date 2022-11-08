const UsersService = require("../../models/services/users.service");
const apiConstants = require("../../utils/api-constants");
const jwt = require("jsonwebtoken");
const { validateRequestInput } = require("../../utils/input-validator");
const { generateHash } = require("../../utils/crypto");

const userList = async (request, response)  => {
    try {
        const users = [];
        const offset = request.query.offset || null;
        const limit = request.query.limit || null;

        const userList = await UsersService.getUsers(null, { offset, limit });

        userList.forEach(user => {
            users.push({
                name: `${user.firstname} ${user.lastname}`,
                email: user.email,
                createdAt: user.created_at,
            });
        });

        response.status(apiConstants.CODES.SUCCESS).send({
            success: true,
            users,
        });
    } catch (error) {
        response.status(apiConstants.CODES.SOMETHING_WENT_WRONG).send({
            success: false,
            message: apiConstants.MESSAGES.GENERAL.SOMETHING_WENT_WRONG,
        });
    }
}

const create = async (request, response)  => {
    try {
        const user = request.body;
        const validations = await validateRequestInput(user, 'create_user');
        if (!validations.isValid) {
            return response.status(apiConstants.CODES.VALIDATION_FAILED).send({
              message: apiConstants.MESSAGES.GENERAL.VALIDATION_FAILED,
              errors: validations.errors,
            });
        }
        const isUserExist = await UsersService.isUserExist(user.email);
        if (isUserExist) {
            return response.status(apiConstants.CODES.CONFLICT).send({
                success: false,
                message: apiConstants.MESSAGES.USERS.EMAIL_ALREADY_EXIST,
                messageType: 'emailConflict',
            });
        }

        user.password = await generateHash(user.password);
        const createdUser = await UsersService.create(user);

        response.status(apiConstants.CODES.SUCCESS).send({
            success: true,
            user: {
                name: `${createdUser.firstname} ${createdUser.lastname}`,
                email: createdUser.email,
                createdAt: createdUser.created_at,
            },
        });
    } catch (error) {
        response.status(apiConstants.CODES.SOMETHING_WENT_WRONG).send({
            success: false,
            message: apiConstants.MESSAGES.GENERAL.SOMETHING_WENT_WRONG,
        });
    }
}

const login = async (request, response, next)  => {
    try {
        const validations = await validateRequestInput(request.body, 'login');
        if (!validations.isValid) {
            return response.status(apiConstants.CODES.VALIDATION_FAILED).send({
              message: apiConstants.MESSAGES.GENERAL.VALIDATION_FAILED,
              errors: validations.errors,
            });
        }
        const email = request.body.email;
        const password = request.body.password;
        const user = await UsersService.loginUser(email, password);

        if (!user) {
            return response.status(apiConstants.CODES.UNAUTHORIZED).send({
                success: false,
                message: apiConstants.MESSAGES.GENERAL.UNAUTHORIZED_ACCESS,
            });
        }

        const payload = {
            userId: user.id,
            userEmail: user.email,
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: Number(process.env.JWT_EXPIRY),
        });

        response.status(apiConstants.CODES.SUCCESS).send({
            success: true,
            message: apiConstants.MESSAGES.USERS.LOGIN_SUCCESSFUL,
            token,
        });
    } catch (error) {
        response.status(apiConstants.CODES.SOMETHING_WENT_WRONG).send({
            success: false,
            message: apiConstants.MESSAGES.GENERAL.SOMETHING_WENT_WRONG,
        });
    }
}

module.exports = {
    userList,
    create,
    login,
}