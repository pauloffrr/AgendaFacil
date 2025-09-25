import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { generateToken } from "../utils/jwt"
import UserModel from "../models/UserModel"
import dotenv from 'dotenv'

dotenv.config()

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400)
            .json({ error: "Email and password are required" })
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
        return res.status(400)
            .json({ error: "Invalid email format" })
    }

    try {
        const user = await UserModel.findOne({ where: { email } })

        if (!user) {
            return res.status(404)
                .json({ error: "User not found" })
        }

        const passwordValidated = await user.validatePassword(password)

        if (!passwordValidated) {
            return res.status(401)
                .json({ error: "Invalid credentials" })
        }

        const token = generateToken(user)

        return res.status(200).json({
            message: "Login successfully",
            token,
            user: {
                id: user.idUser,
                name: user.name,
                email: user.email,
                userType: user.type
            }
        })

    } catch (error) {
        console.error("Login error:", error)
        return res.status(500).json({ error: "Internal server error" })
    }
}

export const userLogged = (req: Request, res: Response) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token not provided or poorly formatted" })
    }

    const token = authHeader.split(" ")[1]

    try {
        const secret = process.env.JWT_SECRET as string

        const decoded = jwt.verify(token, secret)

        return res.status(200).json({
            message: "User successfully authenticated",
            user: decoded
        })
    } catch (error) {
        console.error("Error verifying token:", error)
        return res.status(401).json({ error: "Invalid or expired token" })
    }
}