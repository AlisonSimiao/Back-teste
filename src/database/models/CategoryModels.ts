import { DataTypes } from "sequelize";
import db from "../db";

export const CategoryModel = db.define('categorias',
{
  id :{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  codigo:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  titulo:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
  },
  status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
  },
});