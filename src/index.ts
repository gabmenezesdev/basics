import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import passport from "passport";
import { DataSource } from "typeorm";
import { AuthDBEntity } from "./infra/database/entities/auth.entity";
import { router } from "./infra/http/routes";
import { PassportConfig } from "./config/passportConfig";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "password",
  database: process.env.DB_NAME || "mydb",
  synchronize: process.env.NODE_ENV !== "production",
  logging: false,
  entities: [AuthDBEntity],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Banco de dados conectado!");
    PassportConfig.configurePassport(passport);

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(passport.initialize());
    app.use("/api", router);

    app.post(
      "/login",
      passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: false,
      })
    );

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
