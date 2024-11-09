import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain, ValidationError } from "express-validator";
import { HttpException } from "../../commons";

const validate = async (
    validations: ValidationChain[],
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errorFormatter = (error: ValidationError) => error.msg; // Only extract the message

    const errors = validationResult(req).formatWith(errorFormatter);
    if (errors.isEmpty()) {
        return next();
    }

    const errorMap = errors.mapped();
    const firstError = errorMap[Object.keys(errorMap)[0]];
    const remainingErrors = Object.keys(errorMap).length - 1;

    return next(
        new HttpException(
            `${firstError}. ${remainingErrors ? "(and more errors)" : ""}`,
            422,
            errorMap
        )
    );
};

export default validate;