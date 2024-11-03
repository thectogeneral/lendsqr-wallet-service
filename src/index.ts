import dotenv from "dotenv";

import app from "./app";
import { Logger } from "./utils";


dotenv.config();

exports.APP_PORT = parseInt(process.env.APP_PORT, 10);

const server = app.listen(exports.APP_PORT, () => {
    Logger.info(`🚀 Server ready at port: ${exports.APP_PORT}`);
});