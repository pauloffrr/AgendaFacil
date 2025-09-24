import jwt from "jsonwebtoken"
import UserModel from "../models/UserModel"
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_EXPIRES_IN = "7d"

export const generateToken = (user: UserModel): string => {
    const payload = {
        idUser: user.idUser,
        name: user.name,
        email: user.email,
        type: user.type
    }

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET)
}