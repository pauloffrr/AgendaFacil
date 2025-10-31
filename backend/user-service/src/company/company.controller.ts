import { Controller, Post, Get, Put, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Post()
    create(@Body() dto: CreateCompanyDto) {
        return this.companyService.create(dto);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    findAll() {
        return this.companyService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.companyService.findById(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateCompanyDto,
    ) {
        return this.companyService.update(id, dto);
    }
}