import express from "express";
import { WalletController } from "../controllers";
import { catchAsync } from "../utils";
import {
    verifyAmount,
    isAuthenticated,
} from "../middleware";

const walletRoutes = express.Router();

walletRoutes.post(
    "/fund-wallet",
    isAuthenticated,
    verifyAmount,
    catchAsync(WalletController.fundAuthUserWallet)
);

export default walletRoutes;
