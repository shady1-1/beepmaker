const mongoose = require("mongoose");

const RestaurantSchema = mongoose.Schema(
  {
    restorer: {
      fullname: {
        type: String,
        minlength: 3,
        maxlength: 50,
        trim: true,
        required: true,
      },
    },
    societyName: {
      type: String,
      minlength: 5,
      maxlength: 25,
      trim: true,
      required: true,
    },
    siretNumber: {
      type: String,
      minlength: 14,
      maxlength: 14,
      trim: true,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      minlength: 8,
      maxlength: 14,
      trim: true,
      required: true,
    },
    fieldOfActivity: {
      type: String,
      minlength: 3,
      maxlength: 50,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      select: false,
      minlength: 10,
      maxlength: 255,
      required: true,
    },
    imageMenu: {
        type: String,
        default: "",
    },

    imageURL: {
      type: String,
      default: "",
    },
      meta_data:{},
    isAuthorized: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    isPayed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", RestaurantSchema);
