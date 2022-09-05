import express from "express";
import { extensions } from "sequelize/types/utils/validator-extras";
import db from "./database/db";
import { CategoryModel } from "./database/models/CategoryModels";
import { ProductModel } from "./database/models/ProductModel";
import { produto } from "./types/produto";

const app = express();

app.listen(3000, async ()=>{
  try{
    await db.sync();
  }
  catch(e){
    console.log("db error", e);
  }
  console.log(`${process.env.PROJECT_NAME} running in port 3000`);
})