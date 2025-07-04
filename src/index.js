//require('dotenv').config({path: './env'})
import dotenv from 'dotenv'
import connectDB from "./db/index.db.js"
import { app } from './app.js'

dotenv.config()

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("ERROR: ",error);
        throw error
    })
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("DB Connection failed ", err)
})