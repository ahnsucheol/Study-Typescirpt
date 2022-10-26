import express from "express";
import logger from "morgan";
import router from "./routers/index";
import cors from "cors";

export const createApp = () => {
  const app = express();
  app.use(logger("tiny"), express.json(), cors(), router);

  return app;
};
