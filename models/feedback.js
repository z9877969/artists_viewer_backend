const { Schema, model } = require("mongoose");

const feedbackSchema = new Schema(
  {
    name: String,
    rating: String,
    descr: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Feedback = model("feedback", feedbackSchema);

module.exports = { Feedback };
