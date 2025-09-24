import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config";
import UserModel from "./UserModel";

class Company extends Model {
  public idCompany!: number;
  public corporateReason!: string;
  public cnpj!: string;
  public rayKm!: number;
  public category!: string;
  public profession!: string;
  public userId!: number;
}

Company.init(
  {
    idCompany: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    corporateReason: { 
      type: DataTypes.STRING, 
      allowNull: false
    },
    cnpj: { 
      type: DataTypes.STRING, 
      allowNull: false
    },
    rayKm: { 
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    category: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    profession: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: "Company",
  }
);

UserModel.hasOne(Company, { foreignKey: "userId" });
Company.belongsTo(UserModel, { foreignKey: "userId" });

export default Company;