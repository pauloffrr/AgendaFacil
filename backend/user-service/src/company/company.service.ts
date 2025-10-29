import { Injectable, NotFoundException } from '@nestjs/common';
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
        return this.companyModel.create(data);
    }

    async findAll(): Promise<Company[]> {
        return this.companyModel.findAll();
    }

    async findById(id: number): Promise<Company> {
        const company = await this.companyModel.findByPk(id);
        if (!company) throw new NotFoundException('Company not found');
        return company;
    }

    async update(id: number, data: UpdateCompanyDto): Promise<Company> {
        const company = await this.findById(id);
        await company.update(data);
        return company;
    }
}