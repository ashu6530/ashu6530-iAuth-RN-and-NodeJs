import express from "express"
import { dbConnect } from "./config/dbConnect.js";
import { config } from "dotenv"
import router from "./routes/user.js";
import cors from 'cors'
const app = express()


// config env file 
config({path:"./config/config.env"})


// connect database
dbConnect()

app.use(cors({
    origin: '*', // Adjust this in production to specific origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

// middlewares always put json on top ---
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/',router)


app.get('/',(req,res)=>{
    res.json({success:false,message:"Welcome to Backend" })
})



// listining to port 
app.listen(process.env.PORT,()=>{
    console.log(`server is running at ${process.env.PORT}`);
})