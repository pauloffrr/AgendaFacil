import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserType } from '../user.model';

export class CompanyDto {
    @IsNotEmpty() corporateReason: string;
    @IsNotEmpty() cnpj: string;
    @IsNumber() rayKm: number;
    @IsNotEmpty() category: string;
    @IsNotEmpty() profession: string;
}

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
    @ValidateNested()
    @Type(() => CompanyDto)
    company?: CompanyDto;
}
