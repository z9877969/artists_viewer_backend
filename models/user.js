const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: String,
    password: String,
    apiKey: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = model("user", userSchema);

module.exports = { User };
