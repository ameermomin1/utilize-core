module.exports = {
    CODES: {
        NOT_FOUND: 404,
        SOMETHING_WENT_WRONG: 412,
        SUCCESS: 200,
        CREATED: 201,
        VALIDATION_FAILED: 401,
        UNAUTHORIZED: 401,
        BAD_REQUEST: 400,
        CONFLICT: 409,
    },
    MESSAGES: {
        GENERAL: {
            SOMETHING_WENT_WRONG: 'Sorry, something went wrong.',
            VALIDATION_FAILED: 'Request data is invalid.',
            UNAUTHORIZED_ACCESS: 'Unauthorized access.',
            NOT_AUTHORIZED_TO_ACCESS_THE_API: 'Not authorized to access the API.',
        },
        USERS: {
            EMAIL_ALREADY_EXIST: 'User with this email already exist.',
            LOGIN_SUCCESSFUL: 'Login successfully.'
        },
        GROUPS: {
            GROUP_ALREADY_EXIST: 'Group name already exist.',
            GROUP_CREATED_SUCCESSFULLY: 'Group createt successfully.',
            UNAUTHORIZED_TO_ACCESS_THE_GROUP: 'Not authorized to access the group details.',
            GROUP_ID_IS_REQUIRED: 'Group id is required.',
            GROUP_NOT_FOUND: 'Group not found.',
            GROUP_UPDATED_SUCCESSFULLY: 'Group updated successfully.',
        },
    },
};