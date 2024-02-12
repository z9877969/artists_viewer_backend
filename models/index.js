const models = require("./allData/models");
const { User } = require("./user");
const { Feedback } = require("./feedback");

module.exports = {
  ...models,
  User,
  Feedback,
};
