import {validation} from 'express-validator';
export default (req, res, next) => {
    const errors = validation.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation error',
            errors: errors.array()
        });
    }
    next();
}