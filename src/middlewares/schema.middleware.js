export const validateSchema = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(422).json(errors);
        }
        return next()
    };
};