import db from "./database/db";
import app from "./server";

app.listen(3000, async () => {
  try {
    await db.sync();
  } catch (error) {
    console.log("db error", error);
  }
  console.log(`${process.env.PROJECT_NAME} running in port 3000`);
});