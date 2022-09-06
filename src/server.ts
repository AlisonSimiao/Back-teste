import express, { json } from "express";
import db from "./database/db";
import router from "./router"

const app = express();
app.use( json() );
app.use( router );

app.listen(3000, async ()=>{
  try{
    await db.sync();
  }
  catch(e){
    console.log("db error", e);
  }
  console.log(`${process.env.PROJECT_NAME} running in port 3000`);
})