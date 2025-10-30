import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './company.model';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
    constructor(
        @InjectModel(Company)
        private readonly companyModel: typeof Company,
    ) {}

    async create(data: CreateCompanyDto): Promise<Company> {
        const existingCompany = await this.companyModel.findOne({
            where: { cnpj: data.cnpj }
        });

        if (existingCompany) {
            throw new BadRequestException('CNPJ já cadastrado');
        }

        return this.companyModel.create(data);
    }

    async findAll(): Promise<Company[]> {
        return this.companyModel.findAll({
            include: ['user']
        });
    }

    async findById(id: number): Promise<Company> {
        const company = await this.companyModel.findByPk(id, {
            include: ['user']
        });

        if (!company) throw new NotFoundException('Company not found');
        return company;
    }

    async update(id: number, data: UpdateCompanyDto): Promise<Company> {
        const company = await this.findById(id);
        
        if (data.cnpj && data.cnpj !== company.cnpj) {
            const existingCompany = await this.companyModel.findOne({
                where: { cnpj: data.cnpj }
            });

            if (existingCompany) {
                throw new BadRequestException('CNPJ já cadastrado');
            }
        }

        await company.update(data);
        return company;
    }
}