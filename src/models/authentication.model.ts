import { model, Schema } from 'mongoose'

const authSchema = new Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    role: {type:String,required:true}
})

export const authModel = model('authModel', authSchema)