import {model, Schema} from 'mongoose'

const productSchema= new Schema({
    productName:{type: String, required:true},
    productDescription:{type: String, required:true},
    bids:[{
        userId:{type:String,required:true, unique: true},
        price:{type:Number,required:true},
        status : Boolean
    }],
    sold:{type:Boolean}
    
})
export const productModel = model('productModel', productSchema)