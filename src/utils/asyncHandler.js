//this file handles the asynchrounous part like interacting with database etc. so that we do not need to write the full code again and again
//const asyncHandler=()=>{}

const asyncHandler=(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((error)=>next(error))
    }
}

export {asyncHandler}

// const asyncHandler= (fn)=>async (req,res,next)=>{
//     try{
//         await fn(req,res,next)
//     }catch(error){
//         res.status(error.code||500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }