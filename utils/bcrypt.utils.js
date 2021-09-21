const bcrypt = require("bcryptjs");

module.exports = {
  generateHash: (_plaintext) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(_plaintext, salt);
  },
  verifyHash: (_plaintextPassword, _authToken) =>
    bcrypt.compareSync(_plaintextPassword, _authToken),
};
