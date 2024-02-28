const mongoose = require("mongoose");

const usersModel = mongoose.model(
  "users",
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 40,
    },
    username: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 15,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 15,
    },
    crime: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      // enum: ["ADMIN", "USER"],
      default: "USER",
    },
  }
  // {
  //   timestamps: true,
  // }
);

module.exports = usersModel;
