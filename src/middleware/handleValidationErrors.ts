import { Handler } from "express";
import { validationResult } from "express-validator";

export const handleValidationErrors: Handler = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else {
        res.status(400).json({ errors: errors.array() });
    }
}