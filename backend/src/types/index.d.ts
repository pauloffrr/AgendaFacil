import { Request } from "express";

declare module "express" {
    export interface Request {
        user?: {
            idUser: string | number;
            name: string;
            email: string;
            userType: "CUSTOMER" | "COMPANY";
        };
    }
}