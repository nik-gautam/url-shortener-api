const express = require("express");
const router = express.Router();

const urlController = require("../controllers/urlController");

router.get("/shorten", urlController.getAddShortUrl);
router.get("/", urlController.getAllUrls);
router.get("/changecode", urlController.getChangeCode);
router.get("/delete", urlController.getDeleteUrl);

module.exports = router;
