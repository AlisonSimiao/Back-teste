import { DataTypes, Deferrable } from "sequelize";
import db from "../db"
import { ProductModel } from "./ProductModel";

export const StockModel = db.define('estoque',{
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantidade:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reserva: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}
);

StockModel.hasOne(ProductModel, {
  foreignKey: 'idProduto'
});

ProductModel.belongsTo(StockModel);
