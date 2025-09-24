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
        cpf: user.cpf,
        phone: user.phone,
        state: user.state,
        city: user.city,
        street: user.street,
        number: user.number,
        complement: user.complement,
        email: user.email,
        password: user.password,
        type: user.type
    }

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET)
}