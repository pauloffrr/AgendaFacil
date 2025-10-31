import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async findById(@Param('id') id: number) {
        return this.usersService.findById(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto,
        @Req() req: any
    ) {
        const loggedUser = req.user?.idUser ?? id;
        return this.usersService.update(Number(id), loggedUser, updateUserDto);
    }
}