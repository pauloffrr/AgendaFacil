import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { UserType } from '../user.model';

export class CreateUserDto {
    @IsNotEmpty() name: string;
    @IsNotEmpty() cpf: string;
    @IsNotEmpty() phone: string;
    @IsNotEmpty() state: string;
    @IsNotEmpty() city: string;
    @IsNotEmpty() street: string;
    @IsNumber() number: number;
    @IsOptional() @IsString() complement?: string;
    @IsEmail() email: string;
    @IsNotEmpty() password: string;
    @IsEnum(UserType) @IsNotEmpty() type: UserType;

    @IsOptional()
    company?: {
        corporateReason: string;
        cnpj: string;
        rayKm: number;
        category: string;
        profession: string;
    };
}
