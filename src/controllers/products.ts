import { Request, Response } from "express";
import { CategoryModel } from "../database/models/CategoryModels";
import { ProductModel } from "../database/models/ProductModel";
import { StockModel } from "../database/models/StockModel";

class Product {
  
  async findAll(req: Request, res: Response){
    
    const allProduct = await ProductModel.findAll({include: CategoryModel});

    return res.status(200).json(allProduct);
  }

  async findOne(req: Request, res: Response){
    const id = Number(req.params.id);

    if( !id )
      return res.status(404).json( {message: "IDError> not defined"} )
    

    const product = await ProductModel.findByPk(id, {include: CategoryModel});

    if(!product)
      return res.status(404).json( {message: "IDError> not found product by id"} )
  
    return res.status(200).json(product);
  }

  async create(req: Request, res: Response){
    
    const {
        codigo,
        nome,
        descricao,
        valor,
        idCategoria,
    } = req.body;

    const status = req.body.status ?? true;

    if( codigo.trim() === "")
      return res.status(400).json({message: "CodError> it is mandatory that the codigo is a valid string"});
    if( nome.trim() === "")
      return res.status(400).json({message: "CodError> it is mandatory that the nome is a valid string"});
    if( descricao.trim() === "")
      return res.status(400).json({message: "CodError> it is mandatory that the desscrição is a valid string"});
    if( ! +valor )
      return res.status(400).json({message: "CodError> it is mandatory that the valor is a valid number"});
    if( ! +idCategoria )
      return res.status(400).json({message: "CodError> it is mandatory that the category id is a valid number"});
    try{
      const [product, created] = await ProductModel.findOrCreate({
      where:{
        codigo,
        nome,
    },
      defaults: {
        status,
        valor,
        descricao,
        idCategoria
      }
    })
  
    if( !created )
      return res.status(400).json({message: "DuplicatedError> product with 'nome' or 'codigo' already exists"});
    
    const stock = await StockModel.create({
      idProduto: product["id"],
      quantidade: 0,
      reserva: 0,
    })

    if( ! stock ){
      await product.destroy()
      return res.status(400).json({message: "StockError> stock create error"});
    }
    
    return res.status(201).json(product);
  }
  catch(error){
    return res.status(201).json(error);
  }
  }

  async edit(req: Request, res: Response){
    const id = Number(req.params?.id);
    const productValueClient = req.body;
    const productValue = {};
    
    if( !id )
      return res.status(404).json( {message: "IDError> not defined"} )

    Object.keys(ProductModel.getAttributes()).forEach(
      ( property )=>{
        if( !(productValueClient[property] === undefined) )
          productValue[property] = productValueClient[property];
      }
    )

    try{
      
      const product = await ProductModel.findByPk( id );

      if( !product )
        return res.status(404).json( {message: "IDError> not found product by id"} )
      
      await product.update( productValue );

      res.status(200).json( product );
    }
    catch(error){
      let message = "Error sql",
          status  = 400;

      switch( error.name){
        case "SequelizeForeignKeyConstraintError":
          message = "Category id not found";
          status  = 404;
          break;
      }
        
      res.status(status).json( {message, error} );
    }

    
  }

  async delete(req: Request, res: Response){
    const id = Number(req.params?.id);
    if( !id )
      return res.status(404).json( {message: "IDError> not defined"} )

    try {
      const rows = await ProductModel.destroy({
        where:{ 
          id
        }
      })
      if( !rows ){
        return res.status(404).json({message : `not found data to erase`})
      }
      await StockModel.destroy({
        where: {
          idProduto: null
        }
      })
      res.status(200).json({message : `deleted with success`})
    } catch (error) {
      res.status(400).json( error )
    }
  }
}

export default new Product();