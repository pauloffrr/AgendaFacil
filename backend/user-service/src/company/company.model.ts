import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../users/user.model';

export interface CompanyCreationAttrs {
    corporateReason: string;
    cnpj: string;
    rayKm: number;
    category: string;
    profession: string;
    userId: number;
}

@Table({ tableName: 'Company' })
export class Company extends Model<Company, CompanyCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    idCompany: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    corporateReason: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    cnpj: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    rayKm: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    category: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    profession: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;
}