import {Router} from 'express'
import { registerUser } from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.middleware.js'
const router=Router()
router.route("/register").post(
    //middleware to upload data in local storage temporarily
    upload.fields([//fields takes array of objects
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    //Function (controller) to register user
    registerUser)//http://localhost:8000/api/v1/users/register, /register gets attached automatically
//router.route("/login").post(loginUser)
export default router