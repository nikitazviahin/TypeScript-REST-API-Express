import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import { Routes } from "./routes";

createConnection().then(async connection => {
    const app = express();
    const port = 3010
    //middlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    //set up all routes
    app.use("/", Routes);
    
    app.listen(port, () => {
        console.log(`Server started on port ${port}!`);
    })

}).catch(error => console.log(error));