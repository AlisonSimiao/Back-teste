import { Request, Response } from "express";
import { CategoryModel } from "../database/models/CategoryModels";
import { ProductModel } from "../database/models/ProductModel";
import { StockModel } from "../database/models/StockModel";

class Stock{
  async findOne(req: Request, res: Response){
    const id = Number(req.params.id);

    if( !id )
      return res.status(404).json( {message: "IDError> not defined"} )

    const stock = await StockModel.findOne(
      {
        where:{
          idProduto: id
        }
      });

    if(!stock)
      return res.status(404).json( {message: "IDError> not found product by id"} )
  
    return res.status(200).json(stock);
  }

  async edit(req: Request, res: Response){
    const id = Number(req.params.id);

    const stockValueClient = req.body;
    const stockValues = {};

    if( !id )
      return res.status(404).json( {message: "IDError> not defined"} )
    try{

    
    const stock = await StockModel.findOne(
      {
        where:{
          idProduto: id
        }
      });

    if(!stock)
      return res.status(404).json( {message: "IDError> not found product by id"} )
  
    Object.keys(StockModel.getAttributes()).forEach(
        ( property )=>{
          if( !(stockValueClient[property] === undefined) )
            stockValues[property] = stockValueClient[property];
        }
    )

    await stock.update( stockValues )
    
    return res.status(200).json(stock);
    }
    catch( error ){
      let message = "";
      let status = 400;

      switch( error.name ){
        case "SequelizeForeignKeyConstraintError":
          message = "it is not possible to change the id of the product referenced in the stock"
        break;
      }
      return res.status(status).json({error, message});
    }
  }

  async delete(req: Request, res: Response){
    return res.status(501).send();
  }
}

export default new Stock();