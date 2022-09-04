import express from "express";
import db from "./database/db";

const app = express();

app.listen(3000, async ()=>{
  await db.sync();
  console.log(`${process.env.PROJECT_NAME} running in port 3000`);
})