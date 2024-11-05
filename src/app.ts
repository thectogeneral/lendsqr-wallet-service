import express, { Express, Request, Response } from "express";
import cors from "cors";
import path from "path";

import { ErrorHandler } from "./middleware";
import { Logger } from "./utils";
import { authRoutes } from "./routes";


const app: Express = express();
const allowlist = ["http://localhost:3000", process.env.FRONT_END_URL];

const corsOptionsDelegate = function (
    req: Request,
    callback: (err: any, corsOptions: any) => void
) {
    let corsOptions: any;
    if (allowlist.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions);
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// test index route
app.get("/api/", (req: Request, res: Response) => {
    Logger.info(req.body);
    return res.status(200).json({
        message: "Demo Credit API index page",
        success: true,
    });
});

app.use("/api", authRoutes);
app.use(ErrorHandler);

export default app;