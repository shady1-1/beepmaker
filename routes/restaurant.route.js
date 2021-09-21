const express = require("express");
const router = express.Router();
const path = require('path');
const mongoose  = require("mongoose");
const multer = require("multer");
const fs = require('fs');
const { auth } = require("../middlewares/auth");
const { authMail } = require("../middlewares/authMail");
const { authResetPassword } = require("../middlewares/authResetPassword");
//const file = require("../models/file");
//const File = file
require("../models/file")
const File = mongoose.model("file");

const { upload } = require("../utils/multipart.utils");

const {
  registerRestaurant,
  getOneRestaurant,
  verifyRestaurant,
  checkConnection,
  loginRestaurant,
  uploadImageRestaurant,
  uploadImageMenu,
  changePasswordRestaurant,
  forgotPassword,
  verifyForgotPassword,
  resetPassword,
} = require("../controllers/restaurant.controller");

router.post("/register", registerRestaurant);
router.post("/login", loginRestaurant);

router.post("/upload", auth, upload.single("file"), uploadImageRestaurant);
router.post("/uploadM",auth,  upload.single("file"), uploadImageMenu);
router.get("/:id", getOneRestaurant);

router.get("/verify/:token", verifyRestaurant);
router.get("/admin/connect", auth, checkConnection);
router.post("/confidentiality/changePassword", auth, changePasswordRestaurant);
router.post("/forgotPassword", forgotPassword);
router.post("/verify-forgotPassword", authMail, verifyForgotPassword);
router.post("/resetPassword", authResetPassword, resetPassword);
router.get('/serveimg/:imageURL', (req, res) => {
  let imageURL=req.params.imageURL;
console.log(req.params.imageURL);
  const dir = `${path.join(__dirname, '..','public','images')}`
  console.log(dir);
  console.log(path.join(dir, imageURL));
  const file = fs.readFileSync(path.join(dir, imageURL))
  console.log(file);

  const ext = path.extname(path.join(dir, imageURL));
  console.log(ext)
  const mimeType = ext === '.png' ? 'image/png' : ext === '.pdf' ? 'application/pdf' : ext === '.jpg' ? 'application/jpg' : ext === '.jpeg' ? 'application/jpeg' : null
  let source = fs.createReadStream(path.join(dir, imageURL));
  res.set('Content-Type', mimeType);
  source.pipe(res);

});
router.get('/servepdf/:imageMenu', (req, res) => {
  let imageMenu=req.params.imageMenu ;
  console.log(req.params.imageMenu);
  const dir = `${path.join(__dirname, '..','public','images')}`
  console.log(dir);
  console.log(path.join(dir, imageMenu));
  const file = fs.readFileSync(path.join(dir, imageMenu))
  console.log(file);

  const ext = path.extname(path.join(dir, imageMenu));
  console.log(ext)
  const mimeType = ext === '.png' ? 'image/png' : ext === '.pdf' ? 'application/pdf' : ext === '.jpg' ? 'application/jpg' : ext === '.jpeg' ? 'application/jpeg' : null
  let source = fs.createReadStream(path.join(dir, imageMenu));
  res.set('Content-Type', mimeType);
  source.pipe(res);



});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

const uploadStorage = multer({ storage: storage })

router.post("/upload/single", uploadStorage.single("file"), (req, res) => {
  console.log(req.file)
  return res.send("Single file")
})



module.exports = router;
