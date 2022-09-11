import { DataTypes} from "sequelize";
import db from "../db"
import { ProductModel } from "./ProductModel";

export const StockModel = db.define("estoque",{
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
    defaultValue: true,
  },
}
);

StockModel.belongsTo(ProductModel,{
  constraints: true,
  foreignKey: 'idProduto',
  targetKey: "id",
});

ProductModel.hasOne( StockModel,{
  foreignKey: "idProduto",
  hooks: true,  
} );
