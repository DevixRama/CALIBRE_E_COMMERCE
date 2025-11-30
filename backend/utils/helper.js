import jwt from "jsonwebtoken";
import bycrpt from "bcrypt";


export const generateToken = (userData) => {
    return jwt.sign({ id: userData.rows[0].id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
}


export const generateHash = (password) => {
    return bycrpt.hash(password, 10)
}