const { createRouter } = require("../../helpers");
const { feedbacksControllers: c } = require("../../controllers");
const {
  authenticate,
  validatePagination,
  validateFeedback,
  validateArtistSearching,
} = require("../../middlewares");

// const defaultMiddlewares = [authenticate];
const defaultMiddlewares = [];

const feedbacksRouterOptions = [
  {
    method: "get",
    route: "/",
    middlewares: [validateArtistSearching],
    controller: c.getFeedbacks,
  },
  {
    method: "post",
    route: "/",
    middlewares: [validateFeedback],
    controller: c.addFeedback,
  },
];

const feedbacksRouter = createRouter({
  defaultMiddlewares,
  options: feedbacksRouterOptions,
});

feedbacksRouter.setRouter();

module.exports = feedbacksRouter.router;
