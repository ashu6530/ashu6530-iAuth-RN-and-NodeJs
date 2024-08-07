import jwt from 'jsonwebtoken'
import { User } from '../model/user.js';

export const isAuth = async (req,res,next)=>{
  if ( req.headers && req.headers.authorization){
    const token = req.headers.authorization.split(' ')[1]
    try {
    const decode = jwt.verify(token , process.env.JWT_SECRET_KEY)
    const user = await User.findById(decode.userId)
    if(!user) return res.json({success:false,message:'unauthorized access'})
    req.user = user 
    next()
        
    } catch (error) {
        if (error.name = 'JsonWebTokenError'){
            return res.json({success:false,message:'unauthorized access'})
        }
        if (error.name = 'TokenExpiredError'){
            return res.json({success:false,message:'session expired '})
        }
        res.json({success:false,message:' Internal Server Error '})
    }
    


  }else{
    res.json({success:false,message:'unauthorized access'})
  }
}