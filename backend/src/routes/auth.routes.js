const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/auth.controller.js");
const validate = require("../middleware/validate.middleware.js");
const protect = require("../middleware/auth.middleware.js");
const { registerSchema, loginSchema } = require("../validation/auth.validation.js");
//Flow ->> Request → Validation → Controller → Response

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", protect, getMe);

module.exports = router;
