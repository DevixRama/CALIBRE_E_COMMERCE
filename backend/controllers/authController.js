import bcrypt from "bcrypt";
import CustomErrorHandler from "../middlewares/errorMiddleware.js";
import database from "../database/db.js";
import { generateHash, generateToken } from "../utils/helper.js";
import { generateResetPasswordToken } from "../utils/genResetPasswordToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { forgetPasswordTemplate } from "../utils/forgetPasswordTemplate.js";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";


export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new CustomErrorHandler("All fields are required", 400);
    }

    if (password.length < 8 || password.length > 16) {
        throw new CustomErrorHandler(
            "password musct be between 8 and 16 characters",
            400
        );
    }

    const isAlreadyRegistered = await database.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    if (isAlreadyRegistered.rows.length > 0) {
        throw new CustomErrorHandler("User already registered, try login", 409);
    }

    const hashPassword = await generateHash(password);

    const user = await database.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, hashPassword]
    );

    const token = generateToken(user);
    res.cookie("token", token, {
        expires: new Date(
            Date.now() + Number(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    });

    res
        .status(201)
        .json({
            success: true,
            message: "User registered successfully",
            user,
            token,
        });
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new CustomErrorHandler("All fields are required", 400);
    }

    const user = await database.query("SELECT * FROM users WHERE email = $1", [
        email,
    ]);

    if (user.rows.length === 0) {
        throw new CustomErrorHandler("User not registered", 404);
    }

    const match = await bcrypt.compare(password, user.rows[0].password);

    if (!match) {
        throw new CustomErrorHandler("Invalid credentials", 401);
    }

    const token = generateToken(user);

    res.cookie("token", token, {
        expires: new Date(
            Date.now() + Number(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    });

    res
        .status(200)
        .json({
            success: true,
            message: "User logged in successfully",
            user: user.rows[0],
            token,
        });
};


export const getUser = async (req, res) => {
    const { user } = req;
    res.status(200).json({ success: true, user });
};


export const logout = async (req, res) => {
    res
        .status(200)
        .cookie("token", "", { expires: new Date(Date.now()), httpOnly: true })
        .json({ success: true, message: "User logged out successfully" });
};


export const forgetPassword = async (req, res) => {
    const { email } = req.body;
    const { frontendUrl } = req.query;

    const userData = await database.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    if (userData.rows.length === 0) {
        throw new CustomErrorHandler("user not Found", 404);
    }

    const user = userData.rows[0];
    const { resetToken, hashedToken, tokenExpireTime } =
        generateResetPasswordToken();

    await database.query(
        "UPDATE users SET reset_password_token = $1, reset_password_expires = to_timestamp($2) WHERE email = $3",
        [hashedToken, tokenExpireTime / 1000, email]
    );

    const resetPasswordUrl = `${frontendUrl}/password/reset/${resetToken}`;
    const message = forgetPasswordTemplate(resetPasswordUrl);

    try {
        await sendEmail({
            email: user.email,
            subject: "STORE APP Password Recovery",
            message: message,
        });
        res
            .status(200)
            .json({
                success: true,
                message: `Email Sent To ${user.email} successfully`,
            });
    } catch (error) {
        await database.query(
            "UPDATE users SET reset_password_token = null, reset_password_expires = null WHERE email = $1",
            [email]
        );
        throw new CustomErrorHandler(
            "recovey failed, Email Could not be Sent",
            500
        );
    }
};


export const resetPassword = async (req, res) => {
    const { resetToken } = req.params;
    const { password, confirmPassword } = req.body;


    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    const user = await database.query(
        "SELECT * FROM users WHERE reset_password_token = $1 AND reset_password_expires > NOW()",
        [resetPasswordToken]
    );

    if (user.rows.length === 0) {
        throw new CustomErrorHandler("Invaild or expire reset token", 400);
    }

    if (password != confirmPassword) {
        throw new CustomErrorHandler("Password do not match", 400);
    }

    if (
        password?.length < 8 ||
        password?.length > 16 ||
        confirmPassword?.length < 8 ||
        confirmPassword?.length > 16
    ) {
        throw new CustomErrorHandler(
            "password musct be between 8 and 16 characters",
            400
        );
    }

    const hashPassword = await generateHash(password);

    const updatedUser = await database.query(
        "UPDATE users SET password = $1, reset_password_token = NULL, reset_password_expires = NULL WHERE id = $2 RETURNING *",
        [hashPassword, user.rows[0].id]
    );

    const token = generateToken(updatedUser);

    res.cookie("token", token, {
        expires: new Date(
            Date.now() + Number(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    });

    res
        .status(201)
        .json({
            success: true,
            message: "Password reset successfully",
            user : updatedUser.rows[0],
            token: token,
        });
};


export const updatePassword = async (req, res) => {
    console.log(229);
    
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const { password, id } = req.user;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
        throw new CustomErrorHandler("All Fields are require", 400);
    }

    console.log(238);
    
    const isPasswordMatch = await bcrypt.compare(currentPassword, password);

    console.log(242);

    if (!isPasswordMatch) {
        throw new CustomErrorHandler("Current Incorrect password", 401);
    }

    if (
        newPassword.length > 8 &&
        newPassword.length < 16 &&
        confirmNewPassword.length > 8 &&
        confirmNewPassword.length < 16
    ) {
        throw new CustomErrorHandler(
            "password should be between 8 and 16 characters",
            400
        );
    }

    if (newPassword !== confirmNewPassword) {
        throw new CustomErrorHandler("Passwords do not match", 400);
    }

    const hashPassword = await generateHash(newPassword);

    await database.query("UPDATE users SET password = $1 WHERE id = $2", [
        hashPassword,
        id,
    ]);

    res
        .status(201)
        .json({ success: true, message: "password change successfully" });
};


export const updateProfile = async (req, res) => {
    const { name, email } = req.body;
    const { id } = req.user;

    if (!name || !email) {
        throw new CustomErrorHandler("All fields are required", 400);
    }

    let avatarData = {};
    if (req.files && req.files.avatar) {
        const { avatar } = req.files;

        if (req.user?.avatar?.public_id) {
            await cloudinary.uploader.destroy(req.user.avatar.public_id);
        }

        const newProfileImage = await cloudinary.uploader.upload(
            avatar.tempFilePath,
            {
                folder: "Profile_avatars",
                width: 150,
                crop: "scale",
            }
        );

        avatarData = {
            public_id: newProfileImage.public_id,
            url: newProfileImage.secure_url,
        };
    }

    let user;
    if (Object.keys(avatarData).length === 0) {
        user = await database.query("UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *", [name, email, id])
    } else {
        user = await database.query("UPDATE users SET name = $1, email = $2, avatar = $3 WHERE id = $4 RETURNING *", [name, email, avatarData, id])
    }

    res.status(200).json({ success: true, message: "Profile updated successfully", user: user.rows[0] })

};
