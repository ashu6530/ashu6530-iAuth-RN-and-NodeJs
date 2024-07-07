import { v2 as cloudinary } from 'cloudinary';
import {config} from 'dotenv';
config({path:"./config/config.env"})
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME ,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_Secret ,
})

export default cloudinary