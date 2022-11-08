const { Router } = require("express");
const usersRoute = require("./users/users.route");
const groupsRoute = require("./groups/groups.route");
const messagesRoute = require("./messages/messages.route");
const analyticsRoute = require("./analytics/analytics.route");
const { auth } = require("../middlewares/auth");

const router = Router();

router.use("/users", usersRoute);

router.use("/groups", auth, groupsRoute);

router.use("/messages", auth, messagesRoute);

router.use("/analytics", auth, analyticsRoute);

module.exports = router;