const Joi = require("joi");
const { createError } = require("../../helpers");

const searchArtistSchema = Joi.object({
  limit: Joi.number().min(3).max(25),
  page: Joi.number().min(1),
  name: Joi.string(),
  genre: Joi.string(),
  sortName: Joi.string().valid("abs", "desc"),
});

const validateArtistSearching = (req, res, next) => {
  try {
    const { error } = searchArtistSchema.validate(req.query);
    if (error) {
      throw createError(400, error.message);
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateArtistSearching,
};
