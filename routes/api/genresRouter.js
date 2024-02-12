const { createRouter } = require("../../helpers");
const { genresControllers: c } = require("../../controllers");
const { authenticate } = require("../../middlewares");

// const defaultMiddlewares = [authenticate];
const defaultMiddlewares = [];

const genresRouterOptions = [
  {
    method: "get",
    route: "/",
    middlewares: null,
    controller: c.getGenres,
  },
];

const genresRouter = createRouter({
  defaultMiddlewares,
  options: genresRouterOptions,
});

genresRouter.setRouter();

module.exports = genresRouter.router;
