import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import passport from "passport";
import { DataSource } from "typeorm";
import { AuthDBEntity } from "./infra/database/entities/auth.entity";
import { router } from "./infra/http/routes/routes";
import { PassportConfig } from "./infra/config/passportConfig";
import { errorMiddleware } from "./infra/http/errorHandler";
import cors from "cors";

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
    app.use(cors());

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(passport.initialize());
    app.get("/ping", (req, res) => {
      res.status(200).json({ message: "ping" });
    });
    app.use("/api", router);

    app.use(errorMiddleware);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
