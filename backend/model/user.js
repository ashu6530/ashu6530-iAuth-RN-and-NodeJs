import {Schema,model} from "mongoose";


const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
    },
    tokens:[{type:Object}]

})

export const User = model('User',userSchema)