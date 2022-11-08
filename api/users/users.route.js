const { Router } = require("express");
const { userList, create, login } = require("./users.controller");

const router = Router();

router.get("/list", userList);

router.post("/create", create);

router.post("/login", login);

module.exports = router;