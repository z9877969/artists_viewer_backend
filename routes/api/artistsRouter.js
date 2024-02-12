const { createRouter } = require("../../helpers");
const { artistsControllers: c } = require("../../controllers");
const { authenticate, validateArtistSearching } = require("../../middlewares");

// const defaultMiddlewares = [authenticate];
const defaultMiddlewares = [];

const artistsRouterOptions = [
  {
    method: "get",
    route: "/",
    middlewares: [validateArtistSearching],
    controller: c.getArtists,
  },
  {
    method: "get",
    route: "/:id",
    middlewares: null,
    controller: c.getArtistById,
  },
];

const artistsRouter = createRouter({
  defaultMiddlewares,
  options: artistsRouterOptions,
});

artistsRouter.setRouter();

module.exports = artistsRouter.router;
