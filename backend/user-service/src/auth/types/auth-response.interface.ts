import { AuthenticatedUser } from './jwt-payload.interface';

export interface LoginResponse {
    message: string;
    token: string;
    user: AuthenticatedUser;
}

export interface ProfileResponse {
    message: string;
    user: AuthenticatedUser;
}