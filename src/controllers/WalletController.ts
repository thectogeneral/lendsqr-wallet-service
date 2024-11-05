import { NextFunction, Request, Response } from "express";

// local imports
import {
    AppError,
    checkWalletBalance,
    compareWalletBalanceWithAmount,
    isAmountLessThanOneDollar,
    isAmountLessThanTwoDollar,
    Logger,
} from "../utils";
import {
    findUserWallet,
    updateWalletBalance,
    findUserByEmail,
    transferFunds,
    createTransaction,
} from "../models";

class WalletController {
    constructor() {
        this.fundAuthUserWallet = this.fundAuthUserWallet.bind(this);
    }

    async fundAuthUserWallet(req: Request, res: Response, next: NextFunction) {
        try {
            const { amount } = req.body;
            const { id } = req.user[0];

            const wallet = await findUserWallet(id, next);

            isAmountLessThanTwoDollar(amount, next);

            let updateType = "add";
            const newBalance = await updateWalletBalance(
                wallet!,
                amount,
                updateType
            );

            return res.status(200).json({
                success: true,
                message: `$${amount} has been added to your wallet. Your new balance is $${newBalance}`,
            });
        } catch (error: unknown) {
            Logger.error("An error occured: " + error);
            return res.json({
                success: false,
                errors: error,
            });
        }
    }

}

export default new WalletController();
