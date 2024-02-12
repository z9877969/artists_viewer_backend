const Joi = require("joi");
const { createError } = require("../../helpers");

const feedbackSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  rating: Joi.number().min(1).max(5).required(),
  descr: Joi.string().min(10).max(512).required(),
});

const validateFeedback = (req, res, next) => {
  try {
    const { error } = feedbackSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateFeedback,
};
