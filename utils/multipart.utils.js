const multer = require("multer");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = __dirname + "\\..\\public\\images";
    fs.mkdirSync(path, { recursive: true });
    return cb(null, path);
  },
  filename: function (req, file, cb) {
    const MIME_TYPES = {
      "image/jpg": "jpg",
      "image/jpeg": "jpg",
      "image/png": "png",
      'application/pdf' : 'pdf',
    };
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = MIME_TYPES[file.mimetype];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

const upload = multer({ storage });
const uploadf = multer({
  storage: storage,
  limits:{fileSize: 1000000},
}).single("file");

const removeFile = (filename) => {
  try {
    fs.unlink(`public\\images\\${filename}`);
  } catch (error) {}
};
module.exports = {
  upload,
  uploadf,
  removeFile,
};
