const validator = require("validator");
const RestaurantModel = require("../models/restaurant.model");
const { generateHash, verifyHash } = require("../utils/bcrypt.utils");
const jwt = require("../utils/jwt.utils");
const { apiResponse } = require("../utils/api.utils");
const { secretType } = require("../utils/enum.utils");
const { sendMail, sendMailReset } = require("../utils/sendmail.utils");
const { removeFile } = require("../utils/multipart.utils");

const getRestaurant = async (_query, _withPassword = false) => {
  /* condidate to be moved to utils function */
  return await RestaurantModel.find(_query)
      .select(_withPassword !== false ? "+password" : "")
      .catch((err) => {
        throw err;
      });
};

const loginRestaurant = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return apiResponse(res, 401, {
      status: "failed",
      message: `Échec de la connexion : demande invalide !`,
    });
  }

  let { email, password } = req.body;
  const restaurant = await getRestaurant(
      { email: validator.normalizeEmail(email) },
      true
  );

  if (!restaurant.length) {
    return apiResponse(res, 404, {
      status: "failed",
      message: `Échec de la connexion : combinaison de mot de passe e-mail invalide !`,
    });
  }

  const {
    _id,
    password: userPassword,
    isAuthorized,
    isVerified,
  } = restaurant[0];

  if (!verifyHash(password, userPassword)) {
    return apiResponse(res, 404, {
      status: "failed",
      message: `Échec de la connexion : combinaison de mot de passe e-mail invalide !`,
    });
  }

  if (!isVerified) {
    return apiResponse(res, 403, {
      status: "failed",
      message: `Vérification de l'adresse e-mail : Veuillez vérifier votre compte à partir de votre adresse e-mail
: \`${email}\` to login !`,
    });
  }
  if (!isAuthorizeblockedd) {
    return apiResponse(res, 403, {
      status: "blocked",
      message: `votre email address : \`${email}\` est blocké !`,
    });
  }

  const token = await jwt.sign({ _id }, "7d", secretType.USER).catch(() => {
    return apiResponse(res, 403, {
      status: "failed",
      message: `Échec de la connexion : problème de serveur !`,
    });
  });
  return apiResponse(res, 200, {
    status: "ok",
    message: `Succès de connexion : Connexion ok: \`${email}\` !`,
    token: token,
  });
};

const registerRestaurant = async (req, res) => {
  const {
    restorer,
    societyName,
    siretNumber,
    address,
    phone,
    fieldOfActivity,
    password,
  } = req.body;

  //condition to check
  //if (!req.body.email) { }

  const email = validator.normalizeEmail(req.body.email);
  const restaurant = await getRestaurant({ email });

  if (!!restaurant[0]) {
    const { status } = restaurant[0];
    if (status === "Active" || status === "Pending")
      return apiResponse(res, 200, {
        status: "failed",
        message: `Disponibilité de l'adresse e-mail : Cet e-mail  : \`${email}\` est déja utilisé !`,
      });
    //else if (status === "Pending") return apiResponse(res, 200, { status: "ok", message: `Email Address verification : Please verify your account from your email address : \`${email}\` !` });
    return apiResponse(res, 403, {
      status: "blocked",
      message: `Cet e-mail  : \`${email}\` est bloqué !`,
    });
  } else {
    const plaintextPassword = password;
    try {
      const password = generateHash(plaintextPassword);

      await RestaurantModel.createIndexes();

      const dataToStore = {
        restorer: {
          ...restorer,
        },
        societyName,
        siretNumber,
        address,
        phone,
        fieldOfActivity,
        email,
        password: plaintextPassword,
      };
      const restaurant = new RestaurantModel(dataToStore);
      await restaurant.validate();
      dataToStore.password = password;

      const result = await RestaurantModel.create(dataToStore);

      const token = await jwt.sign({ email }, "24h", secretType.EMAIL);
      await sendMail(
          email,
          `https://beep-maker.herokuapp.com/api/restaurant/verify/${token}`,
          "Confirmation de l'adresse e-mail"
      );

      return apiResponse(res, 201, {
        status: "ok",
        message: `Inscription au restaurant : Le restaurant a été enregistré avec succès !`,
      });
    } catch (e) {
      let message = e.message;
      if (e.code === 11000) {
        message = `Échec de la validation du restaurant : clé en double ${JSON.stringify(
            e.keyValue
        )}`;
      }
      return apiResponse(res, 422, {
        status: "failed",
        message: `${message} !`,
      });
    }
  }
};
const verifyRestaurant = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = await jwt.verify(token, secretType.EMAIL);
    const email = decoded.email;
    const restaurant = await getRestaurant({ email });

    if (!restaurant.length) {
      return apiResponse(res, 404, {
        status: "invalidToken",
        message: `Le compte n'est plus disponible`,
      });
    }

    const { _id, isVerified } = restaurant[0];
    if (isVerified) {
      return apiResponse(res, 200, {
        status: "validToken",
        message: `Votre adresse email : \`${email}\` est déjà vérifié !`,
        redirection: true,
      });
    }
    await RestaurantModel.findByIdAndUpdate(_id, { $set: { isVerified: true } });
    return apiResponse(res, 200, {
      status: "validToken",
      message: `Votre adresse email : \`${email}\` est vérifié avec succès !`,
      redirection: true,
    });
  } catch (e) {
    return apiResponse(res, 401, {
      status: "invalidToken",
      message: e.message,
    });
  }
};

const getOneRestaurant = async (req, res) => {
  const { id } = req.params;
  const restaurant = await getRestaurant({ _id: id }).catch((e) => {});
  if (restaurant && restaurant.length)
    return apiResponse(res, 200, { message: ``, data: restaurant });
  else
    return apiResponse(res, 404, {
      message: `Il n'y a pas de résultat disponible pour cet identifiant: \`${id}\` !`,
      data: [],
    });
};

const checkConnection = async (req, res) => {
  res.send({
    success: true,
  });
};

const uploadImageRestaurant = async (req, res) => {
  if (!req.file)
    return apiResponse(res, 401, {
      success: false,
      message: `échec du chargement de l'image !`,
    });
  const { file, user } = req;
  const filter = { _id: user.id };
  const update = { imageURL: file.filename };


  const doc = await RestaurantModel.findOneAndUpdate(filter, update, {
    new: true,
  }).catch((e) => {
    return apiResponse(res, 401, {
      success: false,
      message: `échec de la mise à jour du profil !`,
    });
  });


  return apiResponse(res, 200, {
    success: true,
    filename: doc.imageURL,
  });
};
const changePasswordRestaurant = async (req, res) => {
  const { oldPassword, newPassword1, newPassword2 } = req.body;

  if (oldPassword.trim() === "" || newPassword2.trim() === "") {
    return apiResponse(res, 200, {
      success: false,
      message: `Passwords Syntax : Le mot de passe ne peut pas être vide !`,
    });
  }

  if (newPassword1 !== newPassword2) {
    return apiResponse(res, 200, {
      success: false,
      message: `Match Passwords failed : les deux mots de passe ne correspondent pas !`,
    });
  }

  if (oldPassword === newPassword2) {
    return apiResponse(res, 200, {
      success: false,
      message: `Match Passwords failed : Le nouveau mot de passe doit être différent de votre ancien mot de passe !`,
    });
  }

  try {
    const { id: _id } = req.user;
    const restaurant = await getRestaurant({ _id }, true);

    if (!verifyHash(oldPassword, restaurant[0].password)) {
      return apiResponse(res, 200, {
        success: false,
        message: `Connexion failed : ancien mot de passe invalide !`,
      });
    }

    let dataToStore = restaurant[0];
    dataToStore.password = newPassword2;
    const newRestaurant = new RestaurantModel(dataToStore);

    await newRestaurant.validate();
    const password = generateHash(newPassword2);
    dataToStore.password = password;

    await RestaurantModel.create(dataToStore);

    return apiResponse(res, 200, {
      success: true,
      message: `Mot de passe mis à jour : Votre mot de passe a été modifié avec succès`,
    });
  } catch (e) {
    return apiResponse(res, 200, {
      success: false,
      message: e.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  const email = validator.normalizeEmail(req.body.email);
  const restaurant = await getRestaurant({ email });

  if (!restaurant.length) {
    return apiResponse(res, 404, {
      success: false,
      message: `Échec de la réinitialisation du mot de passe :L'adresse e-mail n'existe pas
`,
    });
  }

  if (!restaurant[0].isAuthorized) {
    return apiResponse(res, 404, {
      success: false,
      message: `Échec de la réinitialisation du mot de passe: \`${email}\` est bloqué
 !`,
    });
  }

  try {
    const token = await jwt.sign(
        { email },
        "15m",
        secretType.EMAIL_RESET_PASSWORD
    );
    await sendMailReset(
        email,
        `https://beep-maker.herokuapp.com/reset-password/${token}`,
        "Mot de passe de réinitialisation du compte"
    );
    return apiResponse(res, 200, {
      success: true,
      message: `Mot de passe de réinitialisation du compte : Veuillez vérifier votre adresse e-mail : \`${email}\` !`,
    });
  } catch (e) {
    return apiResponse(res, 200, {
      success: true,
      message: e.message,
    });
  }
};

const verifyForgotPassword = async (req, res) => {
  const { email } = req.user;
  try {
    const token = await jwt.sign(
        { email },
        "15m",
        secretType.FORM_RESET_PASSWORD
    );
    return apiResponse(res, 200, {
      success: true,
      message: `Oublier la vérification du mot de passe : Vérification de l'e-mail ok !`,
      token,
    });
  } catch (e) {
    return apiResponse(res, 200, {
      success: true,
      message: e.message,
    });
  }
};


/*  this section is for the menu */
const uploadImageMenu = async (req, res) => {
  if (!req.file)
    return apiResponse(res, 401, {
      success: false,
      message: `échec du chargement de l'image!`,
    });
  const { file, user } = req;
  const filter = { _id: user.id };
  const update = { imageMenu: file.filename };


  const doc = await RestaurantModel.findOneAndUpdate(filter, update, {
    new: true,
  }).catch((e) => {
    return apiResponse(res, 401, {
      success: false,
      message: ` échec de la mise à jour du profil !`,
    });
  });


  return apiResponse(res, 200, {
    success: true,
    filename: doc.imageMenu,
  });
};



const resetPassword = async (req, res) => {
  const { newPassword1, newPassword2 } = req.body;
  const { email } = req.user;

  if (newPassword1 !== newPassword2) {
    return apiResponse(res, 200, {
      success: false,
      message: `Match Passwords failed : les deux mots de passe ne correspondent pas!`,
    });
  }

  try {
    const _id = req.user.id;
    const restaurant = await getRestaurant({ email }, true);

    let dataToStore = restaurant[0];
    dataToStore.password = newPassword2;
    const newRestaurant = new RestaurantModel(dataToStore);

    await newRestaurant.validate();
    const password = generateHash(newPassword2);
    dataToStore.password = password;

    await RestaurantModel.create(dataToStore);
    return apiResponse(res, 200, {
      success: true,
      message: `Password updated : Votre mot de passe a été modifié avec succès
`,
    });
  } catch (e) {
    return apiResponse(res, 200, {
      success: false,
      message: e.message,
    });
  }
};
module.exports = {
  registerRestaurant,
  getOneRestaurant,
  verifyRestaurant,
  checkConnection,
  loginRestaurant,
  uploadImageRestaurant,
  changePasswordRestaurant,
  forgotPassword,
  verifyForgotPassword,
  resetPassword,
  uploadImageMenu,
};