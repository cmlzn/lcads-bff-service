const express = require("express");
const app = express();
const routes = require("routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { errorConverter, errorHandler } = require("middlewares/error");

const apiFace = require("./api-face");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOrigin = process.env.CORS_ORIGIN;
if (!corsOrigin) {
  app.use(cors());
} else {
  const origins = [corsOrigin];
  const corsLocalPortStart = 3000;
  const corsLocalPortEnd = 3020;
  for (let prtNbr = corsLocalPortStart; prtNbr <= corsLocalPortEnd; prtNbr++) {
    origins.push(`http://localhost:${prtNbr}`);
  }
  app.use(cors({ origin: origins, credentials: true }));
}

app.use(cookieParser());

app.use("/", routes);

apiFace(app);

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
