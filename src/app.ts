import express, { Express, Request, Response } from "express";
import { Logger } from "./utils";
import { authRoutes } from "./routes";


const app: Express = express();

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

export default app;