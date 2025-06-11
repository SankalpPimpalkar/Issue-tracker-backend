import { JWT_SECRET, NODE } from "../../constants.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const cookieOptions = {
    httpOnly: true,
    secure: NODE == "PROD",
    sameSite: "Lax",
    maxAge: 3600000,
}

export async function RegisterUser(req, res) {
    try {

        const { username, email, password } = req.body;
        console.log(req.body)

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        })

        if (existingUser) {
            return res.
                status(400)
                .json({
                    error: "User already exists with same username or email",
                    success: false
                })
        }

        const newUser = await User.create({
            username,
            email,
            password
        })

        if (newUser) {
            return res
                .status(201)
                .json({
                    message: "New user is registered successfully",
                    success: true,
                    data: newUser
                })
        }

    } catch (error) {
        console.log("Failed to Register User", error.message)
        return res
            .status(500)
            .json({
                error: "Internal Server Error",
                message: error.message,
                success: false
            })
    }
}

export async function LoginUser(req, res) {
    try {

        const { username, email, password } = req.body;
        console.log(cookieOptions)

        const user = await User.findOne({
            $or: [{ email }, { username }]
        })

        console.log(user)


        if (!user) {
            return res.
                status(404)
                .json({
                    error: "User does not exist with provided email or username",
                    success: false
                })
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password)

        if (!isCorrectPassword) {
            return res.
                status(401)
                .json({
                    error: "Wrong Password",
                    success: false
                })
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET)

        res.cookie('token', token, cookieOptions)

        return res
            .status(200)
            .json({
                message: "User logged in successfully",
                success: true,
                data: user
            })

    } catch (error) {
        console.log("Failed to Login User", error.message)
        return res
            .status(500)
            .json({
                error: "Internal Server Error",
                message: error.message,
                success: false
            })
    }
}


export async function GetCurrentUser(req, res) {
    try {

        return res
            .status(200)
            .json({
                message: "User Details Fetched",
                success: true,
                data: req.user
            })

    } catch (error) {
        console.log("Failed to Get Current User", error.message)
        return res
            .status(500)
            .json({
                error: "Internal Server Error",
                message: error.message,
                success: false
            })
    }
}

export async function IsUserNameExists(req, res) {
    try {

        const { username } = req.params;

        const existingUserWithUsername = await User.findOne({ username })

        if(existingUserWithUsername){
            return res
            .status(200)
            .json({
                error: "Username already taken",
                success: false
            })
        }

        return res
            .status(200)
            .json({
                message: "Username is available",
                success: true
            })

    } catch (error) {
        console.log("Failed to Check Username", error.message)
        return res
            .status(500)
            .json({
                error: "Internal Server Error",
                message: error.message,
                success: false
            })
    }
}