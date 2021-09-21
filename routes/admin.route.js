const express = require("express");
const router = express.Router();

const {
  blockMail,
  validateMail,
  registerAdmin,
  loginAdmin,
  getAllRestaurants,
  checkConnection,
} = require("../controllers/admin.controller");

const { auth } = require("../middlewares/authAdmin");

router.post("/login", loginAdmin);
router.post("/register", registerAdmin); // dev access only
router.get("/restaurant/list", getAllRestaurants);
router.get("/validate/mail/restaurant/:_id", validateMail);
router.get("/block/mail/restaurant/:_id", blockMail);
router.get("/connect", auth, checkConnection);

module.exports = router;
