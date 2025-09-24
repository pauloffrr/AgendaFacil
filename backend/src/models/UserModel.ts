import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../config/config";

export type UserType = 'CUSTOMER' | 'COMPANY';

class UserModel extends Model {
  public idUser!: number;
  public name!: string;
  public cpf!: string;
  public phone!: string;
  public state!: string;
  public city!: string;
  public street!: string;
  public number!: number;
  public complement!: string;
  public email!: string;
  public password!: string;
  public type!: UserType;

  public async hashPassword() {
    this.password = await bcrypt.hash(this.password!, 10)
  }

  public async validatePassword(password: string) : Promise<boolean> {
    return await bcrypt.compare(password, this.password!)
  }

  public static validatePasswordLevel(password: string) {
    const requirements = {
      hasACapitalLetter: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasANumber: /[0-9]/.test(password),
      thereIsSpecial: /[!@#$%&*°?]/.test(password),
      minimumSize: password.length >= 8
    }
      
    const validate = Object.values(requirements).every(Boolean)
        
    return {
      validate,
      requirements,
      menssage: validate ? 'Valid password' : 'Password does not meet minimum requirements'
    }
  }
}

UserModel.init(
  {
    idUser: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    name: { 
      type: DataTypes.STRING, 
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    phone: { 
      type: DataTypes.STRING, 
      allowNull: false
    },
    state: { 
      type: DataTypes.STRING, 
      allowNull: false
    },
    city: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    street: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    number: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    complement: { 
      type: DataTypes.STRING, 
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: "User",
  }
);

export default UserModel;