import express from 'express'
import cors from 'cors'//cross origin resource sharing (resource sharing where port and url are different)
import cookieParser from 'cookie-parser'//cookie parser is used to access and set cookies of user's browser
const app=express()
app.use(cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true
}))
app.use(express.json({limit: "16kb"}))//accepts json and sets limit
app.use(express.urlencoded({extended:true, limit:"16kb"}))//url encodes, extended=> objects can be used inside other objects
app.use(express.static("public"))//Static is used for storing files in server in a folder. public is a sample name for the folder
app.use(cookieParser())

//Routes
import userRouter from './routes/user.routes.js'
//Routes declaration
app.use("/api/v1/users",userRouter)//http://localhost:8000/api/v1/users

export {app}

