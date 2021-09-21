const jwt = require("../utils/jwt.utils");
const BeepModel = require("../models/beep.model");
const { secretType } = require("../utils/enum.utils");

const updateBeep = async (data, socket, update, change) => {
  if (!data.token || !data.beepId) {
    return socket.emit("error", {
      success: false,
      message: "Échec de la mise à jour du bip",
    });
  }
  const { beepId, token } = data;
  const { _id: id } = await jwt.verify(token, secretType.USER).catch(() => {
    return socket.emit("error", {
      success: false,
      message: "Échec de la mise à jour du bip",
    });
  });
  const filter = {
    restaurantId: id,
    _id: beepId,
  };
  const doc = await BeepModel.findOneAndUpdate(filter, update, {
    new: true,
  }).catch(() => {
    return socket.emit("error", {
      success: false,
      message: "Échec de la mise à jour du bip",
    });
  });

  socket.to(beepId).emit("getUpdate", { success: true, beep: doc, change });
  socket.emit("snap", {
    change,
    beep: doc,
  });
};

module.exports = {
  updateBeep,
};
