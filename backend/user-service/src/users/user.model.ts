import { Table, Column, Model, DataType, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import bcrypt from 'bcrypt';

export enum UserType {
    CUSTOMER = 'CUSTOMER',
    COMPANY = 'COMPANY'
}

@Table({ tableName: 'User', timestamps: false })
export class User extends Model<User> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'idUser'
    })
    idUser: number;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    cpf: string;

    @Column({ allowNull: false })
    phone: string;

    @Column({ allowNull: false })
    state: string;

    @Column({ allowNull: false })
    city: string;

    @Column({ allowNull: false })
    street: string;

    @Column({ allowNull: false })
    number: number;

    @Column({ allowNull: true })
    complement: string;

    @Column({ allowNull: false })
    email: string;

    @Column({ allowNull: false })
    password: string;

    @Column({ allowNull: false })
    type: UserType;

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

    static validatePasswordLevel(password: string) {
        const requirements = {
            hasACapitalLetter: /[A-Z]/.test(password),
            hasLowerCase: /[a-z]/.test(password),
            hasANumber: /[0-9]/.test(password),
            thereIsSpecial: /[@#$%&*°?]/.test(password),
            minimumSize: password.length >= 8
        };

        const validate = Object.values(requirements).every(Boolean);
        return {
            validate,
            requirements,
            message: validate
                ? 'Valid password'
                : 'Password does not meet minimum requirements'
        };
    }

    @BeforeCreate
    static async hashPassword(instance: User) {
        instance.password = await bcrypt.hash(instance.password, 10);
    }

    @BeforeUpdate
    static async updatePassword(instance: User) {
        if (instance.changed('password')) {
            instance.password = await bcrypt.hash(instance.password, 10);
        }
    }
}