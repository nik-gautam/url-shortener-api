const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");

router.get("/:urlCode", indexController.getIndex);
router.get("/", indexController.getInit);

module.exports = router;
