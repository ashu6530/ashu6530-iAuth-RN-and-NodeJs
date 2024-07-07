import mongoose from "mongoose";

export const dbConnect =()=>{
    
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('db connected');
    }).catch((err)=>{
        console.log(err.message);
    })

}

