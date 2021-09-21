const jwt = require("jsonwebtoken");
const { secretType } = require("./enum.utils");

const secretBeep = Buffer.from(process.env.JWT_BEEP_ACCESS, "base64");
const secretEmail = Buffer.from(process.env.JWT_EMAIL_ACCESS, "base64");
const secretUser = Buffer.from(process.env.JWT_USER_ACCESS, "base64");
const secretAdmin = Buffer.from(process.env.JWT_ADMIN_ACCESS, "base64");
const emailResetPassword = Buffer.from(
  process.env.JWT_EMAIL_RESET_PASSWORD,
  "base64"
);
const formResetPassword = Buffer.from(
  process.env.JWT_FORM_RESET_PASSWORD,
  "base64"
);

function sign(object, expiresIn, secretTp) {
  let secret = "";
  switch (secretTp) {
    case secretType.BEEP:
      secret = secretBeep;
      break;
    case secretType.EMAIL:
      secret = secretEmail;
      break;
    case secretType.USER:
      secret = secretUser;
      break;
    case secretType.ADMIN:
      secret = secretAdmin;
      break;
    case secretType.EMAIL_RESET_PASSWORD:
      secret = emailResetPassword;
      break;
    case secretType.FORM_RESET_PASSWORD:
      secret = formResetPassword;
      break;
    default:
      reject(new Error("Invalid Secret Type"));
      break;
  }
  return new Promise((resolve, reject) => {
    jwt.sign({ ...object }, secret, { expiresIn }, (err, token) => {
      if (err) return reject(err);
      return resolve(token);
    });
  });
}

function verify(token, secretTp) {
  let secret = "";
  switch (secretTp) {
    case secretType.BEEP:
      secret = secretBeep;
      break;
    case secretType.EMAIL:
      secret = secretEmail;
      break;
    case secretType.USER:
      secret = secretUser;
      break;
    case secretType.ADMIN:
      secret = secretAdmin;
      break;
    case secretType.EMAIL_RESET_PASSWORD:
      secret = emailResetPassword;
      break;
    case secretType.FORM_RESET_PASSWORD:
      secret = formResetPassword;
      break;
    default:
      reject(new Error("Invalid Secret Type"));
      break;
  }
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      {
        return resolve(decoded);
      }
    });
  });
}

module.exports = {
  sign,
  verify,
};
