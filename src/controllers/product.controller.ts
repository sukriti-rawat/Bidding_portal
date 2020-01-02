import { Request, Response, NextFunction } from "express";
import { Product, getProductDTO as ProductDTO } from "../interface/product";
import { authModel } from '../models/authentication.model';
import { productModel } from "../models/product.model";
import { send } from "../util/send";
const { JWT_SECRET } = process.env


export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    delete req.body._id;

    let data: any = await authModel.findOne({ _id: userId }).lean();

    if (data === null) {
      return send(res, {}, "User not Found", 400);
    }

    const payload = {
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      price: req.body.Price,
      bids: [],
      sold: false
    }

    if (data.role === "Admin") {
      await new productModel(payload).save();

      return send(res, { payload }, "Product Added");
    } else {
      return next({ msg: `Trader cannot create product`, httpStatusCode: 400 })
    }
  } catch (error) {
    next(error);
  }
};


export const acceptBid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, productId } = req.body
    const foundProduct: Product = await productModel.findOne({ _id: productId }).lean()
    if (foundProduct === null) {
      return next({ msg: "Product not found" })
    }
    foundProduct.bids.map(bid => {
      if (bid.userId === userId) {
        bid.status = true
      }
    })

    await productModel.updateOne({ _id: foundProduct._id }, foundProduct)

    send(res, {}, "Bid accepted")
  } catch (error) {
    next(error)
  }
}

export const placeBid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, productId, price } = req.body;
    let data: any = await authModel.findOne({ _id: userId })

    if (data === null) {
      return send(res, {}, "User not Found", 400);
    }

    const bidPayload = {
      userId,
      price,
      status: false
    }

    if (data.role === "Trader") {
      await productModel.findByIdAndUpdate({ _id: productId }, { $push: { bids: bidPayload } })
      return send(res, {}, "Bid placed");
    } else {
      return next({ msg: `Trader not found` })
    }
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId }: ProductDTO = req.query;
    let result = null
    if (productId) {
      result = await productModel.find({ _id: productId });
    } else {
      result = await productModel.find()
    }
    send(res, { result }, "");
  } catch (error) {
    next(error);
  }
};
