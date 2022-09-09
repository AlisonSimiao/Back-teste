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
  idProduto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProductModel,
      key: 'id',
      deferrable: new Deferrable.INITIALLY_IMMEDIATE
    }
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