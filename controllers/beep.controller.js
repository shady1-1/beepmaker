const BeepModel = require("../models/beep.model");
const jwt = require("../utils/jwt.utils");
const { apiResponse } = require("../utils/api.utils");
const { secretType } = require("../utils/enum.utils");

const generateBeep = async (req, res) => {
  if (!req.body.restaurantId) {
    return apiResponse(res, {
      success: false,
      message: "Le restaurant que vous chercher est indisponible",
    });
  }
  const { restaurantId } = req.body;
  const filter = {
    restaurantId,
  };
  try {
    const oldBeep = await BeepModel.findOne(filter).sort({ numero: -1 }).exec();
    const newBeepNumber = oldBeep ? oldBeep.numero + 1 : 1;
    const beep = new BeepModel({
      numero: newBeepNumber,
      restaurantId,
    });
    await beep.validate();
    const newBeep = await beep.save();
    const token = await jwt.sign({ id: newBeep._id }, "3h", secretType.BEEP);
    return apiResponse(res, 200, {
      success: true,
      token,
    });
  } catch (error) {
    return apiResponse(res, 200, {
      success: false,
      message: "Il y a eu un probleme de generation de beep",
    });
  }
};

const getBeeps = async (req, res) => {
  const { id: userId } = req.user;
  const filter = {
    restaurantId: userId,
    active: true,
  };

  try {
    const beeps = await BeepModel.find(filter).exec();
    return res.send({
      success: true,
      beeps,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "il ya un error",
      error: error,
    });
  }
};

module.exports = {
  getBeeps,
  generateBeep,
};
