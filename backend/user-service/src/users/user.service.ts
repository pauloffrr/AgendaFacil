import { Injectable, NotFoundException, BadRequestException, ForbiddenException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CompanyService } from '../company/company.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        private readonly companyService: CompanyService
    ) {}

    async create(createUserDto: CreateUserDto) {

        if (!createUserDto.password) {
            throw new BadRequestException('Password is required');
        }

        const passwordValidation = User.validatePasswordLevel(createUserDto.password);
        if (!passwordValidation.validate) {
            throw new BadRequestException({
                error: 'Password too weak',
                details: passwordValidation.requirements,
            });
        }

        try {
            const user = await this.userModel.create(createUserDto as any);

            if (createUserDto.type === 'COMPANY' && createUserDto.company) {
                await this.companyService.create({
                    ...createUserDto.company,
                    userId: user.idUser
                });
            }

            return user;
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    }

    async findAll() {
        return await this.userModel.findAll();
    }

    async findById(id: number) {
        const user = await this.userModel.findByPk(id, {
            include: ['company']
        });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({
            where: { email }
        });
    }

    async update(id: number, userId: number, dto: UpdateUserDto) {
        if (id !== userId)
        throw new ForbiddenException('You do not have permission to edit this user');

        const user = await this.userModel.findByPk(id);
        if (!user) throw new NotFoundException('User not found');

        if (dto.email && dto.email !== user.email)
        throw new BadRequestException('Changing email is not allowed');

        if (dto.currentPassword && dto.newPassword) {
            const correctPassword = await user.validatePassword(dto.currentPassword);
            if (!correctPassword)
                throw new BadRequestException('Incorrect current password');

            const validate = User.validatePasswordLevel(dto.newPassword);
            if (!validate.validate)
                throw new BadRequestException({
                    error: 'Password too weak',
                    details: validate.requirements,
                });

                user.password = dto.newPassword;
        }

        Object.assign(user, dto);
        await user.save();
        return user;
    }
}