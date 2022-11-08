const { Router } = require("express");
const { groupList, create, update, getGroupMessages } = require("./groups.controller");

const router = Router();

router.get("/list", groupList);

router.post("/create", create);

router.put("/update/:groupId", update);

router.get("/messages/:groupId", getGroupMessages);

module.exports = router;