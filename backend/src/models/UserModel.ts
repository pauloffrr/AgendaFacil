import { DataTypes, Model } from 'sequelize';
import sequelize from "../config/database";

class UserModel extends Model {
  id_user: number | undefined;
  name: string | undefined;
  email: string | undefined;
  cpf: String | undefined;
  phone: String | undefined;
  password: string | undefined;

}

UserModel.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'UserModels',
    tableName: 'users',
  }
);

export default UserModel;