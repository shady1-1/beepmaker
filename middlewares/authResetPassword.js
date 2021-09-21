const jwt = require("../utils/jwt.utils");
const { secretType } = require("../utils/enum.utils");

const authResetPassword = async (req, res, next) => {
  const authorization = req.header("Authorization");

  let token = null;
  if (/:/.test(authorization)) {
    token = authorization.split(":")[1];
  }

  if (!token)
    return res.send({
      success: false,
      message: "No token, autorisation refusée",
    });
  try {
    const { email } = await jwt.verify(token, secretType.FORM_RESET_PASSWORD);
    req.user = { email };
    next();
  } catch (error) {
    res.send({ success: false, message: "Token n'est pas valide" });
  }
};

module.exports = { authResetPassword };
