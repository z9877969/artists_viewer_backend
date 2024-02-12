const { Feedback } = require("../models");

const getFeedbacks = async (req, res, next) => {
  try {
    const { apiKey } = req.params;
    const total = await Feedback.countDocuments({ apiKey });
    const { limit, page } = req.query;
    const paginateOptions = {};
    if (limit) {
      paginateOptions.limit = limit;
    }
    if (page) {
      paginateOptions.skip = page;
    }
    const feedbacks = await Feedback.find(
      { $or: [{ apiKey }, { apiKey: { $exists: false } }] },
      "",
      paginateOptions
    );
    res.json({ data: feedbacks, total, page, limit });
  } catch (error) {
    next(error);
  }
};

const addFeedback = async (req, res, next) => {
  try {
    const { apiKey } = req.params;
    const feedback = await Feedback.create({ ...req.body, apiKey });
    res.status(201).json({
      name: feedback.name,
      rating: feedback.rating,
      descr: feedback.descr,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFeedbacks,
  addFeedback,
};
