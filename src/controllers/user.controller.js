import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req,res)=>{
    //get user details from frontend
    //validation - not empty
    //check if user already exists (username or email)
    //check for images, check for avatar
    //upload them to cloudinary
    //create user object - create entry in db
    //remove password and refresh token key from response
    //check for user creation
    //return response if created else return null
    const {fullname, email, username, password}= req.body //data, data from form or json is available in req.body
    console.log("email: ", email); 

    //validation
    // if(fullname==""){
    //     throw new ApiError(400,"fullname is required")
    // }
    if([fullname,email,username,password].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"All fields are required")
    }

    //
    const existedUser=User.findOne({//find the first object with the mentioned properties if exists
        $or: [{username},{email}]//operators, returns the first document which first matches the username or email
    })
    if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }

    const avatarLocalPath =req.files?.avatar[0]?.path//files access given by multer, this returns the path to the file stored in disk, avatar[0] is an object
    //console.log(avatarLocalPath)
    const coverImageLocalPath =req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    //upload to cloudinary
    const avatar= await uploadOnCloudinary(avatarLocalPath)
    const coverImage= await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    const user = await User.create({//takes time so await
        //creating user in database
        fullname,
        avatar: avatar.url,//stores avatar url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
    //when the database object is successfully created, MongoDB automatically adds a _id property to the created object
    const createdUser=User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser, "User registered successfully")
    )
})
export {registerUser}