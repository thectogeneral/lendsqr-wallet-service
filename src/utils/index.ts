import Logger from "../utils/logger";
import catchAsync from "./catchAsync";
import { checkUser } from "./user";
import { AppError } from "./AppError";
import {
    generateWalletAddress,
    checkWalletBalance,
    compareWalletBalanceWithAmount,
} from "./wallet";
import { createUserToken } from "./auth";
import { comparePassword } from "./user";
import { isAmountLessThanTwoDollar, isAmountLessThanOneDollar } from "./wallet";

export {
    AppError,
    Logger,
    catchAsync,
    checkUser,
    generateWalletAddress,
    checkWalletBalance,
    createUserToken,
    comparePassword,
    isAmountLessThanTwoDollar,
    compareWalletBalanceWithAmount,
    isAmountLessThanOneDollar,
};
