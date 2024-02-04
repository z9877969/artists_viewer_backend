const { createRouter } = require("../../helpers");

const defaultMiddlewares = [];

const usersRouterOptions = [
  {
    method: "get",
    route: "/",
    middlewares: null,
    controller: (req, res, next) => {
      res.json("usersRouter get");
    },
  },
];

const artistsRouter = createRouter({
  defaultMiddlewares,
  options: usersRouterOptions,
});

artistsRouter.setRouter();

module.exports = artistsRouter.router;
