import express, { Express, NextFunction, Request, Response } from "express";
import { Logger } from "./utils";


const app: Express = express();

// test index route
app.get("/api/", (req: Request, res: Response) => {
    Logger.info(req.body);
    return res.status(200).json({
        message: "Demo Credit API index page",
        success: true,
    });
});

export default app;