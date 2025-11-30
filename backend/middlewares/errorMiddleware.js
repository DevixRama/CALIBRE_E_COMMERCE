
class CustomErrorHandler extends Error {
    constructor(message, statusCOde) {
        super(message);
        this.statusCOde = statusCOde
    }
}


export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal server error";
    err.statusCOde = err.statusCOde || 500;

    if(err.code === '234505'){
        const message = "deuplicate key error"
        err = new CustomErrorHandler(message, 400)
    }

    if(err.name === "JsonWebTokenError"){
        const message = "Json web token is invalid, try again"
        err = new CustomErrorHandler(message, 400)
    }

    if(err.name === "TokenExpiredError"){
        const message = "Json web token is expired, try again"
        err = new CustomErrorHandler(message, 400)
    }


    return res.status(err.statusCOde).json({ success: false, message: err.message})
}




export default CustomErrorHandler