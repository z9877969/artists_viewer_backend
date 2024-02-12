const { createRouter } = require("../../helpers");
const { authControllers: c } = require("../../controllers");
const { validateAuth } = require("../../middlewares");

const defaultMiddlewares = [];

const authRouterOptions = [
  {
    method: "post",
    route: "/register",
    middlewares: [validateAuth],
    controller: c.registerUser,
  },
  {
    method: "post",
    route: "/login",
    middlewares: [validateAuth],
    controller: c.loginUser,
  },
];

const authRouter = createRouter({
  defaultMiddlewares,
  options: authRouterOptions,
});

authRouter.setRouter();

module.exports = authRouter.router;
