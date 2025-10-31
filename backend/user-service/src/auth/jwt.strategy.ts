import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, AuthenticatedUser } from './types/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private usersService: UsersService,
        private configService: ConfigService
    ) {
        const jwtSecret = configService.get<string>('JWT_SECRET');
        
        if (!jwtSecret) {
            throw new Error('JWT_SECRET environment variable is not defined');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret
        });
    }

    async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
        const user = await this.usersService.findById(payload.idUser);
        
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return {
            idUser: user.idUser,
            name: user.name,
            email: user.email,
            userType: user.type
        };
    }
}