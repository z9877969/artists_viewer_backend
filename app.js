const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swager.json");
const {
  artistsRouter,
  genresRouter,
  authRouter,
  feedbacksRouter,
} = require("./routes");

const app = express();

const loggerFormat = app.get("env") === "development" ? "dev" : "short";

app.use(morgan(loggerFormat));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
// app.use("/api/:apiKey/genres", genresRouter);
// app.use("/api/:apiKey/artists", artistsRouter);
// app.use("/api/:apiKey/feedbacks", feedbacksRouter);
app.use("/api/genres", genresRouter);
app.use("/api/artists", artistsRouter);
app.use("/api/feedbacks", feedbacksRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found - invalid request" });
});

app.use((err, req, res, next) => {
  const { message = "Server error", status = 500 } = err;
  res.status(status).json({ message });
});

module.exports = app;
