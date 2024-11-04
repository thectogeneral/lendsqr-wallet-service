import express from "express";
import { AuthController } from "../controllers";

const authRoutes = express.Router();

authRoutes.post(
    "/register",
    AuthController.register
);

export default authRoutes;