import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config";

export type SchedulingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

class Scheduling extends Model {
    public idScheduling!: number;
    public customerId!: number;
    public professionalId!: number;
    public profession!: string;
    public date!: Date;
    public startTime!: string;
    public endTime!: string;
    public status!: SchedulingStatus;
}

Scheduling.init(
    {
        idScheduling: { 
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true 
        },
        customerId: { 
            type: DataTypes.INTEGER, 
            allowNull: true 
        },
        professionalId: { 
            type: DataTypes.INTEGER, 
            allowNull: true
        },
        profession: { 
            type: DataTypes.STRING, 
            allowNull: true
        },
        date: { 
            type: DataTypes.DATEONLY, 
            allowNull: false 
        },
        startTime: { 
            type: DataTypes.TIME, 
            allowNull: false 
        },
        endTime: { 
            type: DataTypes.TIME, 
            allowNull: false 
        },
        status: { 
            type: DataTypes.STRING, 
            allowNull: false,
            defaultValue: "CONFIRMED" 
        }
    },
    {
        sequelize,
        tableName: "Scheduling",
    }
);

export default Scheduling;