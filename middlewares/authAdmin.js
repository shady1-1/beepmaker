const jwt = require("../utils/jwt.utils");
const { secretType } = require("../utils/enum.utils");

const auth = async (req, res, next) => {
  const authorization = req.header("Authorization");
  const token = authorization.split(":")[1];
  if (!token)
    return res.send({
      success: false,
      message: "No token, autorisation refusée",
    });
  try {
    const { _id: id } = await jwt.verify(token, secretType.ADMIN);
    req.user = { id };
    next();
  } catch (error) {
    res.send({ success: false, message: "Token  n'est pas valide" });
  }
};

module.exports = { auth };
