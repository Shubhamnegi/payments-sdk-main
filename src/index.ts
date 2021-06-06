import dotenv from "dotenv";
import express from "express";
import path from "path";
import * as expressBunyan from 'express-bunyan-logger'
import { getLogger } from "./Helpers/logger";
import { subscriberRoutes } from "./Routes.ts/subscriber"
import { HttpError } from "./Helpers/HttpError";
import Logger from "bunyan";
import { businessUnitRoutes } from "./Routes.ts/business-unit";
import { integrationRoute } from "./Routes.ts/integration";

// initialize configuration
dotenv.config();

// Create application logger

const applicationLogger = getLogger("application-logger")

const app = express();
const port = 8080; // default port to listen

// Configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/health', (req, res, next) => {
    return res.json({ status: "up" })
})

app.use(expressBunyan.default())

// define a route handler for the default home page
app.get("/", (req, res, next) => {
    // render the index template
    res.render("index");
});

app.use('/api/subscriber', subscriberRoutes);
app.use('/api/business-unit', businessUnitRoutes);
app.use('/api/integration', integrationRoute);

// Use next function for error handling
const errorHandler = (
    err: HttpError | Error,
    req: any,
    res: any,
    next: any
) => {
    const log: Logger = req.log ? req.log : applicationLogger;
    let status = 500;
    let message = "Internal server error";
    if (err instanceof HttpError) {
        status = err.status
        message = err.message
        log.error(err.error);
    } else {
        log.error(err)
    }

    return res.status(status).json({
        error: message,
        status
    })
}

// Register error handler
app.use(errorHandler);

// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    applicationLogger.info(`server started at http://localhost:${port}`);
});
