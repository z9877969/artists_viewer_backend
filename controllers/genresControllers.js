const { Genre } = require("../models/allData/models");

const getGenres = async (req, res, next) => {
  try {
    const genres = await Genre.find({});
    res.json(genres);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGenres,
};
