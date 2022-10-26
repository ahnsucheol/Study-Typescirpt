import dotenv from "dotenv";
dotenv.config();
import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
  type: "mysql",
  host: process.env.TYPEORM_HOST,
  port: 3306,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err: Error) => {
    console.error("Error during Data Source initialization", err);
  });
