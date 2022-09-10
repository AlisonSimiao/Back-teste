import express from "express";
import db from "./database/db";

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