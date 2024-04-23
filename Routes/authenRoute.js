const { Router } = require("express");
const authenController = require("../Controllers/authenController");

const router = Router();

router.route("/login").post(authenController.login);

module.exports = router;
