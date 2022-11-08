const apiConstants = require("../../utils/api-constants");
const MessagesService = require("../../models/services/messages.service");
const GroupsService = require("../../models/services/groups.service");
const ParticipantsService = require("../../models/services/participants.service");
const { validateRequestInput } = require("../../utils/input-validator");


const messageList = async (request, response)  => {
    try {
        const offset = request.query.offset;
        const limit = request.query.limit;

        const messages = await MessagesService.getmessagesByUserId(request.user.userId, offset, limit);

        response.status(apiConstants.CODES.SUCCESS).send({
            success: true,
            messages,
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
        const validations = await validateRequestInput(request.body, 'create_message');
        if (!validations.isValid) {
            return response.status(apiConstants.CODES.VALIDATION_FAILED).send({
              message: apiConstants.MESSAGES.GENERAL.VALIDATION_FAILED,
              errors: validations.errors,
            });
        }

        const group = await GroupsService.findOneByCond({
            id: request.body.groupId,
        })

        if (!group) {
            return response.status(apiConstants.CODES.NOT_FOUND).send({
                success: false,
                message: apiConstants.MESSAGES.GROUPS.GROUP_NOT_FOUND,
            });
        }

        const participant = await ParticipantsService.findOneByCond({
            user_id: request.user.userId,
            group_id: request.body.groupId,
            is_active: true,
        })

        if (!participant) {
            return response.status(apiConstants.CODES.UNAUTHORIZED).send({
                success: false,
                message: apiConstants.MESSAGES.GROUPS.UNAUTHORIZED_TO_ACCESS_THE_GROUP,
            });
        }

        const messages = await MessagesService.create({
            user_id: request.user.userId,
            group_id: request.body.groupId,
            message: request.body.message,
        })

        response.status(apiConstants.CODES.SUCCESS).send({
            success: true,
            messages,
        });
    } catch (error) {
        response.status(apiConstants.CODES.SOMETHING_WENT_WRONG).send({
            success: false,
            message: apiConstants.MESSAGES.GENERAL.SOMETHING_WENT_WRONG,
        });
    }
}


module.exports = {
    messageList,
    create,
}