const apiConstants = require("../../utils/api-constants");
const MessagesService = require("../../models/services/messages.service");

const usersWithMostMessages = async (request, response)  => {
    try {
        const formattedAnalyticsReport = [];

        const startDate = request.query.startDate || null;
        const endDate = request.query.endDate || null;

        const analyticsReport = await MessagesService.getUsersWithMostMessages(startDate, endDate);

        analyticsReport.forEach(detail => {
            formattedAnalyticsReport.push({
                username: `${detail.user.firstname} ${detail.user.lastname}`,
                messageCount: detail.dataValues.messageCount,
            });
        });

        response.status(apiConstants.CODES.SUCCESS).send({
            success: true,
            analyticsReport: formattedAnalyticsReport,
        });
    } catch (error) {
        response.status(apiConstants.CODES.SOMETHING_WENT_WRONG).send({
            success: false,
            message: apiConstants.MESSAGES.GENERAL.SOMETHING_WENT_WRONG,
        });
    }
}

const groupsWithMostMessages = async (request, response)  => {
    try {
        const formattedAnalyticsReport = [];

        const analyticsReport = await MessagesService.getGroupsWithMostMessages();

        analyticsReport.forEach(detail => {
            formattedAnalyticsReport.push({
                groupName: detail.group.name,
                messageCount: detail.dataValues.messageCount,
            });
        });

        response.status(apiConstants.CODES.SUCCESS).send({
            success: true,
            analyticsReport: formattedAnalyticsReport,
        });
    } catch (error) {
        response.status(apiConstants.CODES.SOMETHING_WENT_WRONG).send({
            success: false,
            message: apiConstants.MESSAGES.GENERAL.SOMETHING_WENT_WRONG,
        });
    }
}

module.exports = {
    usersWithMostMessages,
    groupsWithMostMessages,
}