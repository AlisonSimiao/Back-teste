import { DataTypes, Deferrable } from "sequelize";
import db from "../db";
import { CategoryModel } from "./CategoryModels";

export const ProductModel = db.define('produtos',
{
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
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

ProductModel.belongsTo(CategoryModel,{
    constraints: true,
    foreignKey: "idCategoria",
    targetKey: "id"
});

CategoryModel.hasMany( ProductModel,{
    foreignKey: "idCategoria",
    onDelete: "set null",
    onUpdate: 'cascade',
    hooks: true,  
} );