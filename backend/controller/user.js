import { User } from "../model/user.js";
import {hash,compare} from 'bcrypt'
import jwt from 'jsonwebtoken'
import cloudinary from "../helper/imageUpload.js";



//singup
export const Signup = async(req,res)=>{
    const { name, email, password} = req.body
    const exsitingUser = await  User.findOne({email})
    if(exsitingUser){
        res.status(400).json({
            success:false,
            message:'Email already exist , try login ..'
        })       
    }
    //hash password 
    const saltRounds = 10
    const hashedPassword = await  hash(password,saltRounds)

    const user = await User({
        name,
        email,
        password:hashedPassword,
    });
 
 
    // save the user 
    await user.save()
    res.status(201).json({
        success: true,
        user})

}

//signIn
export const Signin = async(req,res)=>{

    const { email , password} = req.body 
    const user = await User.findOne({email})

    if (!user) return res.json({success:false,message:'User does not exist'})

        //compare password 
    const passwordMatch = await compare(password,user.password)
    if (!passwordMatch) return res.json({success:false,message:'Password is incorrect'})

        //json web token sign 
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})  

   
    let old_token = user.tokens || []
    if (old_token.length){
     old_token =  old_token.filter(t=>{
        const timeDiff = (Date.now()-parseInt(t.signedAt))  / 1000
        if(timeDiff < 86400){
          return t
        }
      })
    }
    await User.findByIdAndUpdate(user._id,{tokens:[...old_token,{token,signedAt:Date.now().toString()}]})
    const userInfo = {
      name:user.name,
      email:user.email,
      avatar:user.avatar ? user.avatar : " "
    }
      
    


    return res.json({success:true, user :userInfo , token })
}

 export const uploadProfile = async (req, res) => {
        //upload picture
        const { user } = req;
        console.log(req);
        if (!user)
          return res.json({ success: false, message: "unauthorized access" });
        if (!req.file)
          return res.json({ success: false, message: "No file uploaded" });

       
        
        try {
        const result = await cloudinary.uploader.upload(req.file.path,{
                public_id:`${user._id}_profile`,
                width:500,
                height:500,
                crop:'fill'
    
            })
          await User.findByIdAndUpdate(user._id, { avatar: result.url });
          res.status(201).json({success:true,message:'Image uploaded successfully!'})
        } catch (error) {
          res
            .status(500)
            .json({ success: false, message: "Error processing image" });
        }
      }

      export const signOut = async(req,res) =>{
        if (req.headers && req.headers.authorization){
          const token = req.headers.authorization.split(' ')[1]
          if(!token){
            return res.status(401).json({success:false,message:'Authorization fail!'})
          }
          const tokens = req.user.tokens
          const newTokens = tokens.filter(t=> t.token !==tokens) 
          await User.findByIdAndUpdate(req.user._id,{tokens:newTokens})
          res.json({success:true,message:"Sign out successfully"})
        }
      }
    
        


    
        


