const apiConstants = require("../../utils/api-constants");
const { validateRequestInput } = require("../../utils/input-validator");
const GroupsService = require("../../models/services/groups.service");
const ParticipantsService = require("../../models/services/participants.service");
const MessagesService = require("../../models/services/messages.service");

const groupList = async (request, response)  => {
    try {
        const formattedGroup = [];
        const offset = request.query.offset;
        const limit = request.query.limit;

        const groups = await GroupsService.getGroupsByUserId(request.user.userId, offset, limit);

        groups.forEach(group => {
            formattedGroup.push({
                groupName: group.name,
                createdAt: group.created_at,
                creator: `${group.user.firstname} ${group.user.lastname}`,
                users: group.participants,
            });
        });

        response.status(apiConstants.CODES.SUCCESS).send({
            success: true,
            groups: formattedGroup,
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
        const validations = await validateRequestInput(request.body, 'create_group');
        if (!validations.isValid) {
            return response.status(apiConstants.CODES.VALIDATION_FAILED).send({
              message: apiConstants.MESSAGES.GENERAL.VALIDATION_FAILED,
              errors: validations.errors,
            });
        }

        const isGroupExist = await GroupsService.isGroupExist(request.body.groupName);
        if (isGroupExist) {
            return response.status(apiConstants.CODES.CONFLICT).send({
                success: false,
                message: apiConstants.MESSAGES.GROUPS.GROUP_ALREADY_EXIST,
                messageType: 'groupNameConflict',
            });
        }

        const group = await GroupsService.create({
            name: request.body.groupName,
            created_by: request.user.userId,
        });
        
        if (group) {
            await ParticipantsService.create({
                user_id: request.user.userId,
                group_id: group.id,
            })
        }

        response.status(apiConstants.CODES.SUCCESS).send({
            success: true,
            message: apiConstants.MESSAGES.GROUPS.GROUP_CREATED_SUCCESSFULLY,
        });
    } catch (error) {
        response.status(apiConstants.CODES.SOMETHING_WENT_WRONG).send({
            success: false,
            message: apiConstants.MESSAGES.GENERAL.SOMETHING_WENT_WRONG,
        });
    }
}

const update = async (request, response)  => {
    try {
        const groupId = request.params.groupId;
        const validations = await validateRequestInput(request.body, 'update_group');
        if (!validations.isValid) {
            return response.status(apiConstants.CODES.VALIDATION_FAILED).send({
              message: apiConstants.MESSAGES.GENERAL.VALIDATION_FAILED,
              errors: validations.errors,
            });
        }

        const group = await GroupsService.findOneByCond({
            id: groupId,
        });

        if (!group) {
            return response.status(apiConstants.CODES.NOT_FOUND).send({
                success: false,
                message: apiConstants.MESSAGES.GROUPS.GROUP_NOT_FOUND,
            });
        }

        if (group.created_by !== request.user.userId) {
            return response.status(apiConstants.CODES.UNAUTHORIZED).send({
                success: false,
                message: apiConstants.MESSAGES.GROUPS.UNAUTHORIZED_TO_ACCESS_THE_GROUP,
            });
        }

        if (request.body?.uninvites?.length) {
            await ParticipantsService.update({ is_active: false }, {
                user_id: request.body.uninvites
            });
        }

        const invites = request.body?.invites;
        if (invites?.length) {
            const newParticipant = [];
            invites.forEach(participant => {
                newParticipant.push({
                    group_id: groupId,
                    user_id: participant,
                })
            })
            await ParticipantsService.bulkCreate(newParticipant);
        }

        await GroupsService.update({
            name: request.body.groupName,
        },{ id: groupId });

        response.status(apiConstants.CODES.SUCCESS).send({
            success: true,
            message: apiConstants.MESSAGES.GROUPS.GROUP_UPDATED_SUCCESSFULLY,
        });
    } catch (error) {
        response.status(apiConstants.CODES.SOMETHING_WENT_WRONG).send({
            success: false,
            message: apiConstants.MESSAGES.GENERAL.SOMETHING_WENT_WRONG,
        });
    }
}

const getGroupMessages = async (request, response)  => {
    try {
        const groupId = request.params.groupId;
        const offset = request.query.offset;
        const limit = request.query.limit;

        if (!groupId) {
            return response.status(apiConstants.CODES.VALIDATION_FAILED).send({
                success: false,
                message: apiConstants.MESSAGES.GROUPS.GROUP_ID_IS_REQUIRED,
            });
        }

        const group = await GroupsService.findOneByCond({
            id: groupId,
        })

        if (!group) {
            return response.status(apiConstants.CODES.NOT_FOUND).send({
                success: false,
                message: apiConstants.MESSAGES.GROUPS.GROUP_NOT_FOUND,
            });
        }

        const participant = await ParticipantsService.findOneByCond({
            user_id: request.user.userId,
            group_id: groupId,
            is_active: true,
        })

        if (!participant) {
            return response.status(apiConstants.CODES.UNAUTHORIZED).send({
                success: false,
                message: apiConstants.MESSAGES.GROUPS.UNAUTHORIZED_TO_ACCESS_THE_GROUP,
            });
        }

        const messages = await MessagesService.findAllByCond({ group_id: groupId }, offset, limit);

        response.status(apiConstants.CODES.SUCCESS).send({
            success: true,
            groupName: group.name,
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
    groupList,
    create,
    update,
    getGroupMessages,
}