import { Request, Response } from "express";
const { Op } = require("sequelize");
import { CategoryModel } from "../database/models/CategoryModels";

class categories {
  
  async findAll(req: Request, res: Response){
    
    const allCategories = await CategoryModel.findAll();

    return res.status(200).json(allCategories);
  }

  async findOne(req: Request, res: Response){
    const id = Number(req.params.id);

    if( !id ){
      return res.status(404).json( {message: "IDError> not defined"} )
    }

    const category = await CategoryModel.findByPk(id);

    if(!category){
      return res.status(404).json( {message: "IDError> not found category by id"} )
    }

    return res.status(200).json(category);
  }

  async create(req: Request, res: Response){
    const {
      codigo,
      titulo,
    } = req.body;
    const status = req.body.status ?? true;

    if( codigo.trim() === "")
      return res.status(400).json({message: "CodError> it is mandatory that the codigo is a valid string"});
    if( titulo.trim() === "")
      return res.status(400).json({message: "CodError> it is mandatory that the titulo is a valid string"});
    
    const [category, created] = await CategoryModel.findOrCreate({
      where:{ titulo, codigo },
      defaults: {
        status
      }
    })

    if( !created )
      return res.status(400).json({message: "DuplicatedError> category with 'titulo' or 'codigo' already exists"});
    return res.status(201).json(category);
  }

  async edit(req: Request, res: Response){
    const id = Number(req.params?.id);
    const categoryValueClient = req.body;
    const categoryValue = {};
    
    if( !id )
      return res.status(404).json( {message: "IDError> not defined"} )

    Object.keys(CategoryModel.getAttributes()).forEach(
      ( property )=>{
        console.log(property , categoryValueClient[property] === undefined )
        if( !(categoryValueClient[property] === undefined) )
          categoryValue[property] = categoryValueClient[property];
      }
    )

    try{
      const category = await CategoryModel.findByPk( id );
      await category.update( categoryValue );

      res.status(200).json( category );
    }
    catch(e){
      res.status(400).json( {error: e.errors[0]} );
    }

    
  }

  async delete(req: Request, res: Response){
    const id = Number(req.params?.id);
    if( !id )
      return res.status(404).json( {message: "IDError> not defined"} )

    try {
      const rows = await CategoryModel.destroy({
        where:{ 
          id
        }
      })
      if( !rows ){
        return res.status(404).json({Message : `not found data to erase`})
      }

      res.status(200).json({Message : `deleted with success`})
    } catch (error) {
      res.status(400).json( error )
    }
  }
}

export default new categories();