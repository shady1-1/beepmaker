const { updateBeep } = require("../helpers/beep.helper");
const { secretType } = require("../utils/enum.utils");

const jwt = require("../utils/jwt.utils");
const BeepModel = require("../models/beep.model");

const handleConnection = (socket) => {
  socket.on("auth", async (data) => {
    try {
      const { id } = await jwt.verify(data.beepToken, secretType.BEEP);
      const beep = await BeepModel.findById(id);
      if (!beep.active) {
        return socket.emit("auth", { success: false });
      }
      socket.join(id);
      return socket.emit("auth", { success: true, beep });
    } catch (error) {
      return socket.emit("auth", { success: false });
    }
  });
  socket.on("call", async (data) => {
    const doc = await BeepModel.findById(data.beepId).catch((e) => {
      socket.emit("auth", { success: false, message: "Beep non existant !" });
    });
    const newCallNumber = doc.callNumber + 1;
    const update = {
      callNumber: newCallNumber,
      ready: true,
    };
    await updateBeep(data, socket, update, "call");
  });
  socket.on("confirm", async (data) => {
    const update = {
      confirmed: true,
    };
    await updateBeep(data, socket, update, "confirm");
  });
  socket.on("delete", async (data) => {
    const update = {
      active: false,
    };
    await updateBeep(data, socket, update, "delete");
  });
  socket.on("add-note", async (data) => {
    const update = {
      note: data.note,
      confirmed: true,
    };
    console.log(data.note);
    await updateBeep(data, socket, update, "add-note");
  });
};

module.exports = { handleConnection };
