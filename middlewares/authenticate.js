const { createError } = require("../helpers");
const { User } = require("../models");

const authenticate = async (req, res, next) => {
  try {
    const { apiKey } = req.params;

    const user = await User.findOne({ apiKey });

    if (!user) {
      throw createError(403);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticate,
};
