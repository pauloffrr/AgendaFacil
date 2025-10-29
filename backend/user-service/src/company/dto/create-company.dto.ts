import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    corporateReason: string;

    @IsString()
    @IsNotEmpty()
    cnpj: string;

    @IsInt()
    @Min(1)
    rayKm: number;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString()
    @IsNotEmpty()
    profession: string;

    @IsInt()
    @IsNotEmpty()
    userId: number;
}