import mongoose, {Schema} from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const userSchema=new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,//required for searching, but expensive
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        //index: true,//required for searching
    },
    fullname:{
        type: String,
        required: true,
        //unique: true,
        //lowercase: true,
        trim: true,
        index: true,//required for searching
    },
    avatar: {
        type: String, //Cloudinary url
        required: true
    },
    coverImage: {
        type: String, //Cloudinary url
    },
    watchHistory : [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true,"Password is required"]//Added error message
    },
    refreshToken: {
        type: String
    }
},{timestamps:true})
userSchema.pre("save",async function(next) {
    if(!this.isModified("password")) return next()
    this.password=bcrypt.hash(this.password,10)
    next()
})//arrow function not used as arrow function does not have this object

userSchema.methods.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password,this.password)    
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign(
    {
        _id: this._id,//given by mongodb
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken = function(){
    jwt.sign(
    {
        _id: this._id,//given by mongodb, refresh token has less data
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
}

export const User= mongoose.model("User",userSchema)