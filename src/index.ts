import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import * as expressBunyan from 'express-bunyan-logger'

// initialize configuration
dotenv.config();

const app = express();
const port = 8080; // default port to listen

// Configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(expressBunyan.default())

// define a route handler for the default home page
app.get("/", (req, res, next) => {
    // render the index template
    res.render("index");
});

app.get("/error", (req: any, res: any, next: any) => {
    next(new Error("Test Error"))
})

const errorHandler = (
    err: Error,
    req: any,
    res: any,
    next: any
) => {
    const log = req.log;
    if (err) {
        log.error(err)
    }
    return res.status(500).json({ error: "Internal Error" })
}

app.use(errorHandler);

// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
