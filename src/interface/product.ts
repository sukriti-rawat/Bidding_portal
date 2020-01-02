import { ObjectId } from "bson";
import {Document} from 'mongoose'
export interface Product extends Document {
  productName: string;
  productDescription: string;
  bids:[{
    userId:string,
    price:number,
    status : boolean,
}],
sold:boolean
}
export interface getProductDTO {
  productId: String;
}
