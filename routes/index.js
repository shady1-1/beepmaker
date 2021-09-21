const express = require("express");
const router = express.Router();
const restaurantRoute = require("./restaurant.route");
const adminRoute = require("./admin.route");
const beepRoute = require("./beep.route");

router.get("/", (_, res) => res.send("welcome"));
router.use("/restaurant", restaurantRoute);
router.use("/admin", adminRoute);
router.use("/beeps", beepRoute);

module.exports = router;
