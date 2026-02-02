const adminMiddleware = (req, res, next) => {
    try {
        // auth middleware se req.user aa chuka hoga
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized: user not found"
            });
        }

        // role check
        if (req.user.role !== "ADMIN") {
            return res.status(403).json({
                message: "Access denied: Admin only"
            });
        }

        // sab theek → next controller
        next();
    } catch (error) {
        res.status(500).json({
            message: "Admin middleware error",
            error: error.message
        });
    }
};

module.exports = adminMiddleware;
