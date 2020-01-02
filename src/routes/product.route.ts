import {
  addProduct,
  getProduct,
  placeBid,
  acceptBid
} from "../controllers/product.controller";
import express from "express";

export const productRouter = express.Router();

productRouter
  .route("/product")
  .get(getProduct)
  .post(addProduct)


// productRouter.route("/product/all").get(getAllProduct);

productRouter.route("/bid").post(placeBid);

productRouter.route("/acceptBid").post(acceptBid);

