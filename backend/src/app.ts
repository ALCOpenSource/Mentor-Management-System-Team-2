import * as bodyParser from "body-parser";
import express, { Application } from "express";
import "dotenv/config";
import { APILogger } from "./logger/api.logger";
import { connect } from "./config/db.config";
import routes from "./routes";
import * as fs from "fs";
import { getAllModelsInDir } from "./utils";
import * as path from "path";
import { Sequelize } from "sequelize-typescript";
import UserService from "./service/api";
import { serviceContainer } from "./utils/container";

export let sequelize: Sequelize;
class App {
  public express: Application;
  public logger: APILogger;

  /* Swagger files start */
  private swaggerFile: any = process.cwd() + "/src/swagger/swagger.json";
  private swaggerData: any = fs.readFileSync(this.swaggerFile, "utf8");
  private customCss: any = fs.readFileSync(
    process.cwd() + "/src/swagger/swagger.css",
    "utf8",
  );
  private swaggerDocument = JSON.parse(this.swaggerData);
  /* Swagger files end */

  constructor() {
    this.express = express();
    this.init();
    this.logger = new APILogger();
  }

  private init(): void {
    const db = connect();

    const engine = db.sequelize;

    engine
      .sync({ force: false })
      .then(() => {
        sequelize = engine;
        this.depInjection(engine);
        this.middleware();
        this.routes();
      })
      .catch((err: any) => {

        process.exit(1);
      });
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    // log all requests to the console
    this.express.use((req, res, next) => {
      this.logger.info("Request::" + req.url, req.body);
      next();
    });
  }

  private routes(): void {
    this.express.use("/api", routes);


    // handle undefined routes
    this.express.use("*", (req, res) => {
      res.send("Make sure url is correct!!!");
    });
  }

  private depInjection = (db: Sequelize): void => {
    this.express.use((req: any, res, next) => {
      // initialize services here
      const userSrv = new UserService(db);
      // add services to the container
      const container = serviceContainer({ userSrv });

      const object = Object.freeze(container);
      req.container = object;
      next();
    });
  };
}

export default new App().express;
