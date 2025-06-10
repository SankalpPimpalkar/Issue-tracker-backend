import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../constants.js";
import User from "../models/user.model.js";

export default async function VerifyUser(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res
                .status(401)
                .json({
                    error: "Unauthorized access - token missing",
                    success: false
                })
        }

        const decodedToken = jwt.verify(token, JWT_SECRET)

        if (!decodedToken) {
            return res
                .status(401)
                .json({
                    error: "Unauthorized access - Invalid token",
                    success: false
                })
        }

        const user = await User.findById(decodedToken.id).select("-password")

        if (!user) {
            return res
                .status(404)
                .json({
                    error: "User not found",
                    success: false
                })
        }

        req.user = user
        next()

    } catch (error) {
        console.log("Failed to verify user")
        return res
            .status(500)
            .json({
                error: "Internal Server error" || error.message,
                success: false
            })
    }
}   