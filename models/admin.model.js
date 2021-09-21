const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema(
  {
		fullname: {
			type: String,
			minlength: 3,
			maxlength: 50,
			trim: true,
		},
		address: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      minlength: 8,
      maxlength: 14,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
			required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
      minlength: 10,
      maxlength: 255,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", AdminSchema);