import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";

createConnection().then(async connection => {

    // create express app
    const app = express();
    

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    //routes
    app.use("/", routes);

    // start express server
    app.listen(3000, () => {
			console.log("Server started on port 3000!");
		});
}).catch(error => console.log(error));
