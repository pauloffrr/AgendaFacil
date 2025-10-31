import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import { User } from '../users/user.model';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './types/jwt-payload.interface';
import { LoginResponse, ProfileResponse } from './types/auth-response.interface';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.usersService.findByEmail(email);
        
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }

    async login(loginDto: LoginDto): Promise<LoginResponse> {
        const { email, password } = loginDto;

        if (!email || !password) {
            throw new BadRequestException('Email and password are required');
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new BadRequestException('Invalid email format');
        }

        const user = await this.validateUser(email, password);

        const payload: JwtPayload = {
            idUser: user.idUser,
            name: user.name,
            email: user.email,
            userType: user.type
        };

        return {
            message: 'Login successfully',
            token: this.jwtService.sign(payload),
            user: {
                idUser: user.idUser,
                name: user.name,
                email: user.email,
                userType: user.type,
            }
        };
    }

    async getProfile(userId: number): Promise<ProfileResponse> {
        const user = await this.usersService.findById(userId);
        
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return {
            message: 'User successfully authenticated',
            user: {
                idUser: user.idUser,
                name: user.name,
                email: user.email,
                userType: user.type
            }
        };
    }
}