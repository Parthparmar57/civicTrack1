const ApiError = require("../utils/ApiError");

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        const message = error.errors[0].message;
        next(new ApiError(400, message));
    }
};

module.exports = validate;
