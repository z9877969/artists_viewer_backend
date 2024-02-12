const Joi = require("joi");
const { createError } = require("../../helpers");

const authSchema = Joi.object({
  email: Joi.string().max(128).email().required(),
  password: Joi.string().min(8).max(64).required(),
});

const validateAuth = (req, res, next) => {
  try {
    const { body } = req;
    const { error } = authSchema.validate(body);
    if (error) {
      throw createError(400, error.message);
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateAuth,
};
