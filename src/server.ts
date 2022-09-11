import express, { json } from "express";
import db from "./database/db";
import router from "./router";

const app = express();

app.use(json());
app.use( router );

export default app;