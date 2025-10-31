import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
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

    async login(loginDto: { email: string; password: string }) {
        const { email, password } = loginDto;

        if (!email || !password) {
            throw new BadRequestException('Email and password are required');
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new BadRequestException('Invalid email format');
        }

        const user = await this.validateUser(email, password);

        const payload = {
            idUser: user.idUser,
            name: user.name,
            email: user.email,
            userType: user.type
        };

        return {
            message: 'Login successfully',
            token: this.jwtService.sign(payload),
            user: {
                id: user.idUser,
                name: user.name,
                email: user.email,
                userType: user.type,
            }
        };
    }

    async getProfile(userId: number) {
        const user = await this.usersService.findById(userId);
        
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return {
            message: 'User successfully authenticated',
            user: {
                id: user.idUser,
                name: user.name,
                email: user.email,
                userType: user.type
            }
        };
    }
}