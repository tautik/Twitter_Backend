import express from "express";
import bodyParser from "body-parser";

import { connect } from "./config/database.js";
import apiRoutes from "./routes/index.js";

const app = express();

const startServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(3000, async () => {
    console.log("server started at port 3000");
    await connect();
    console.log("Mongo db connected");
  });
};
startServer();
