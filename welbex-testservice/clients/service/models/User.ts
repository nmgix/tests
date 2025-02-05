import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, BuildOptions } from "sequelize";
import bcrypt from "bcryptjs";

export interface UserAttributes {
  id: string | null;
  name: string;
  email: string;
  password: string;
  level: number | null;
}

interface UserModel extends Model<UserAttributes>, UserAttributes {
  validPassword(password: string): boolean;
}

type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

export function userFactory(sequelize: Sequelize): UserStatic {
  const User = <UserStatic>sequelize.define(
    "users",
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      name: {
        allowNull: false,
        autoIncrement: false,
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        allowNull: false,
        autoIncrement: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        autoIncrement: false,
        type: DataTypes.STRING,
      },
      level: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
      hooks: {
        beforeCreate: async function (user) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
        beforeUpdate: async function (user) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
      },
    }
  );
  User.prototype.validPassword = async function (password: string) {
    var result = await bcrypt.compare(password, this.password);
    return result;
  };

  return User;
}
