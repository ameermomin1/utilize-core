const { Router } = require("express");
const { messageList, create } = require("./messages.controller");
const router = Router();

router.get("/list", messageList);

router.post("/create", create);

module.exports = router;


