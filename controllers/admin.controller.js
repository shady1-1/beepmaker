const validator = require("validator");
const jwt = require("../utils/jwt.utils");
const { secretType } = require("../utils/enum.utils");
const { apiResponse } = require("../utils/api.utils");
const { generateHash, verifyHash } = require("../utils/bcrypt.utils");

const RestaurantModel = require("../models/restaurant.model");
const AdminModel = require("../models/admin.model");

const getRestaurant = async (_query, _withPassword = false) => {
  return await RestaurantModel.find(_query)
    .select(_withPassword !== false ? "+password" : "")
    .catch((e) => {});
};

const getAdmin = async (_query, _withPassword = false) => {
  return await AdminModel.find(_query)
    .select(_withPassword !== false ? "+password" : "")
    .catch((e) => {});
};

const registerAdmin = async (req, res) => {
  const { fullname, address, phone, password } = req.body;

  const email = validator.normalizeEmail(req.body.email);
  const admin = await getAdmin({ email });

  if (!!admin[0]) {
    return apiResponse(res, 200, {
      status: "failed",
      message: `Email Address availability : Cette adresse e-mail : \`${email}\` est déjà pris!`,
    });
  } else {
    const plaintextPassword = password;
    try {
      const password = generateHash(plaintextPassword);

      const dataToStore = {
        fullname,
        address,
        phone,
        email,
        password: plaintextPassword,
      };
      const admin = new AdminModel(dataToStore);
      await admin.validate();
      dataToStore.password = password;

      const result = await AdminModel.create(dataToStore);

      return apiResponse(res, 201, {
        status: "ok",
        message: `Super Admin registration : Super Admin was registered successfully !`,
      });
    } catch (e) {
      return apiResponse(res, 422, {
        status: "failed",
        message: `${e.message} !`,
      });
    }
  }
};

const loginAdmin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return apiResponse(res, 401, {
      status: "failed",
      message: `Connexion failed : invalid request!`,
    });
  }

  let { email, password } = req.body;
  const admin = await getAdmin(
    { email: validator.normalizeEmail(email) },
    true
  );

  if (!admin.length) {
    return apiResponse(res, 404, {
      status: "failed",
      message: `Connexion failed : invalid email password combination !`,
    });
  }

  const { _id, password: userPassword } = admin[0];

  if (!verifyHash(password, userPassword)) {
    return apiResponse(res, 404, {
      status: "failed",
      message: `Connexion failed : invalid email password combination !`,
    });
  }

  const token = await jwt.sign({ _id }, "7d", secretType.ADMIN).catch(() => {
    return apiResponse(res, 403, {
      status: "failed",
      message: `Connexion failed :  Server problem !`,
    });
  });
  return apiResponse(res, 200, {
    status: "ok",
    message: `Connexion success : Login ok : \`${email}\` !`,
    token: token,
  });
};

const validateMail = async (req, res) => {
  const { _id } = req.params;
  await RestaurantModel.findByIdAndUpdate(_id, {
    $set: { isAuthorized: true },
  }).catch(() => {
    return apiResponse(res, 401, {
      status: "failed",
      message: `Connexion failed : Not found!`,
    });
  });
  return apiResponse(res, 200, {
    status: "ok",
    message: `Your email address is successfully verified by Super Admin !`,
  });
};

const blockMail = async (req, res) => {
  const { _id } = req.params;
  await RestaurantModel.findByIdAndUpdate(_id, {
    $set: { isAuthorized: false },
  }).catch((err) => {
    return apiResponse(res, 401, {
      status: "failed",
      message: `Connexion failed : Not found!`,
    });
  });

  return apiResponse(res, 200, {
    status: "ok",
    message: `Your email address is successfully verified by Super Admin !`,
  });
};

const getAllRestaurants = async (req, res) => {
  const restaurants = await getRestaurant({}).catch(() => {
    return apiResponse(res, 401, {
      status: "failed",
      message: `Connexion failed : Not found!`,
    });
  });
  if (restaurants.length)
    return apiResponse(res, 200, { message: ``, data: restaurants });
  else
    return apiResponse(res, 200, {
      message: `there is no result available !`,
      data: [],
    });
};

const checkConnection = async (req, res) => {
  res.send({
    success: true,
  });
};

module.exports = {
  loginAdmin,
  registerAdmin,
  getAllRestaurants,
  validateMail,
  blockMail,
  checkConnection,
};
