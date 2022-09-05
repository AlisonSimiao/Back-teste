import { DataTypes } from "sequelize";
import db from "../db";

export const CategoryModel = db.define('Categorias',
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
    },
  titulo:{
      type: DataTypes.STRING,
      allowNull: false,
  },
  status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
  },
});