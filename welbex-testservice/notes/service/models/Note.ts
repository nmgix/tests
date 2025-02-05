import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

export type NoteAttributes = {
  id: string;
  userId: string;
  title: string;
  text: string;
};
export interface NoteModel extends Model<Partial<NoteModel>>, NoteAttributes {
  // validPassword(password: string): boolean;
}
type NoteStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): NoteModel;
};
export function noteFactory(sequelize: Sequelize): NoteStatic {
  const Note = <NoteStatic>sequelize.define(
    "notes",
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "user_notes",
          key: "id",
        },
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "Note",
      },
      text: {
        allowNull: true,
        type: DataTypes.STRING,
        defaultValue: "Note default text",
      },
    },
    {
      timestamps: true,
    }
  );

  return Note;
}
