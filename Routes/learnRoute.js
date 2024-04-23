const { Router } = require("express");
//const permit = require("../Middleware/permission");
const learnController = require("../Controllers/learnController");
const myJwt = require('../Middleware/permission');
const router = Router();
//Check Permission For Use This Route !
router.use(myJwt.jwtValidate);

router.route("/selectProductList").get(learnController.selectProductList);

module.exports = router;
