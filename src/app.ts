import dotenv from "dotenv";

dotenv.config();
import express, { Express, Request, Response } from "express";
import cors from "cors";

import { ErrorHandler } from "./middleware";
import { authRoutes, walletRoutes } from "./routes";


const app: Express = express();
const allowlist = ["http://localhost:3000", process.env.FRONT_END_URL];

const corsOptionsDelegate = (req: Request, callback: (err: any, corsOptions: any) => void) => {
    const origin = req.header("Origin") || "";
    const corsOptions = allowlist.includes(origin) ? { origin: true } : { origin: false };
    callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// // test index route
// app.get("/api/", (req: Request, res: Response) => {
//     Logger.info(req.body);
//     return res.status(200).json({
//         message: "Demo Credit API index page",
//         success: true,
//     });
// });

app.use("/", authRoutes);
app.use("/api", walletRoutes);
app.use(ErrorHandler);

export default app;