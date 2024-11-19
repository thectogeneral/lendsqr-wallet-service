import express, { Request, Response } from "express";
import { WalletController } from "../controllers";
import { catchAsync } from "../utils";
import {
    verifyAmount,
    isAuthenticated,
    verifyFundTransferDetails,
} from "../middleware";

const walletRoutes = express.Router();

walletRoutes.post(
    "/fund-wallet",
    isAuthenticated,
    catchAsync(WalletController.fundAuthUserWallet)
);

walletRoutes.post(
    "/transfer-funds",
    isAuthenticated,
    verifyFundTransferDetails,
    catchAsync(WalletController.transferFundsToAnotherUser)
);

walletRoutes.post(
    "/withdraw-funds",
    isAuthenticated,
    verifyAmount,
    catchAsync(WalletController.withdrawFunds)
);


export default walletRoutes;
