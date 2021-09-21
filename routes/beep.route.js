const express = require("express");
const router = express.Router();
const { generateBeep, getBeeps } = require("../controllers/beep.controller");
const { auth } = require("../middlewares/auth");

// const { auth } = require("../middlewares/auth");

router.get("/", auth, getBeeps);
router.post("/generate", generateBeep);

module.exports = router;
