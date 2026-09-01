export const validate = (schema, target = "body") => {
    return (req, res, next) => {
        const result = schema.safeParse(req[target]);

        if (!result.success) {
            return res.status(400).json({
                status: "error",
                message: "Datos inválidos",
                errors: result.error.issues
            });
        }

        req[target] = result.data;

        next();
    };
};