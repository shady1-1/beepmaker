const mongoose = require("mongoose");

const BeepSchema = mongoose.Schema(
  {
    numero: {
      type: Number,
      required: true,
    },
    restaurantId: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
    callNumber: {
      type: Number,
      default: 0,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    ready: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { strict: true },
  { timestamps: true }
);

module.exports = mongoose.model("Beep", BeepSchema);