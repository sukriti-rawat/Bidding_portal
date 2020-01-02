// Sets environment for application using .env file on root (default)
import { config } from "dotenv";
config();

import { Response, Request, NextFunction } from "express";
import express from "express";

const app = express();

const { PORT, MONGODB_URL } = process.env;
console.log(MONGODB_URL)

import { json } from "body-parser";
import { authRouter } from "./routes/auth.route";
import { productRouter } from "./routes/product.route";

import { connect } from "mongoose";
import { send } from "./util/send";
import { validateTokenMiddleWare } from "./util/validateToken";

connect(
  MONGODB_URL,
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true }
)
  .then(() => console.log("connected"))
  .catch(err => console.log("Db not connected", err));

app.use(json());

app.use("/auth", authRouter);
app.use("/crud",validateTokenMiddleWare, productRouter);

app.get("/", (req, res) => {
  send(res, {}, "Bidding  Portal is awesome");
});

app.use((err, req, res: Response, next) => {
  const errorResponsePatter = {
    message: err.message || "Internal Server Error"
  };
  res.status(err.httpStatusCode || 500).send(errorResponsePatter);
});

app.get("*", (req, res) => {
  res.status(401).send("unauthorized");
});

app.listen(PORT, () => console.log(`server on port : ${PORT}`));
