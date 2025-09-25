import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: {
                idUser: string | number;
                name: string;
                email: string;
                userType: "CUSTOMER" | "COMPANY";
            };
        }
    }
}