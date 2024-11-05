import express from "express";
import { AuthController } from "../controllers";
import { ValidateCreateUserRequest, ValidateLoginRequest } from "../middleware";
import { catchAsync } from "../utils";


const authRoutes = express.Router();

authRoutes.post(
    "/register",
    ValidateCreateUserRequest,
    catchAsync(AuthController.register)
);

authRoutes.post(
    "/login",
    ValidateLoginRequest,
    catchAsync(AuthController.login)
);

export default authRoutes;