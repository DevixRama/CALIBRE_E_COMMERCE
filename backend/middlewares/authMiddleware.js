import jwt from "jsonwebtoken";
import { asyncWrapper } from "./catchAysncError.js";
import database from "../database/db.js";
import CustomErrorHandler from "./errorMiddleware.js";



export const isAuthenticated = asyncWrapper(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new CustomErrorHandler("Unauthorized access", 401))
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);

    const user = await database.query("SELECT * FROM users WHERE id = $1 LIMIT 1", [decoded.id]);

    req.user = user.rows[0];
    next();
})



export const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new CustomErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403))
        }
        next();
    }
}

