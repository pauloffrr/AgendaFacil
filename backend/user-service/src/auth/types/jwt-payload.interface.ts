export interface JwtPayload {
    idUser: number;
    name: string;
    email: string;
    userType: string;
}

export interface AuthenticatedUser {
    idUser: number;
    name: string;
    email: string;
    userType: string;
}