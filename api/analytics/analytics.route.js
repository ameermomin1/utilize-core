const { Router } = require("express");
const { usersWithMostMessages, groupsWithMostMessages } = require("./analytics.controller");
const router = Router();

router.get("/users-with-most-messages", usersWithMostMessages);

router.get("/groups-with-most-messages", groupsWithMostMessages);

module.exports = router;


