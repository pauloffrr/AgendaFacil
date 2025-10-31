import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/company.model';

@Module({
    imports: [SequelizeModule.forFeature([User, Company])],
    controllers: [UsersController],
    providers: [UsersService, CompanyService],
    exports: [UsersService],
})

export class UsersModule {}