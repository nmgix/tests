import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface UserNoteAttributes {
  id: string;
}
interface UserNoteModel extends Model<Partial<UserNoteModel>>, UserNoteAttributes {
  // validPassword(password: string): boolean;
}
type UserNoteStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserNoteModel;
};

export function userNoteFactory(sequelize: Sequelize): UserNoteStatic {
  const User = <UserNoteStatic>sequelize.define(
    "user_notes",
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );

  return User;
}
