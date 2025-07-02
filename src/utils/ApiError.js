class ApiError extends Error {//inherents the default error class, ths new class will be used for personalised and standardised errors
    constructor(statusCode,
        message="Something went wrong",
        error=[],//error array
        stack=""//error stack
    ){
        super(message)
        this.statusCode=statusCode//overwrite
        this.data=null//overwrite
        this.success=false;
        this.errors=error
        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}
export {ApiError}