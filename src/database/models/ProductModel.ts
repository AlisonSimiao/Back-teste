import { DataTypes, Deferrable } from "sequelize";
import db from "../db";
import { CategoryModel } from "./CategoryModels";

export const ProductModel = db.define('Produtos',
{
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  idCategoria:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CategoryModel,
      key: 'id',
      deferrable: new Deferrable.INITIALLY_IMMEDIATE
    }
  },
    codigo :{
      type: DataTypes.STRING,
      allowNull: false,
    },
    nome :{
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao :{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    valor:{
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    status :{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
});