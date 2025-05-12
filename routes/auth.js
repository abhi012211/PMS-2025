import express from "express";
import {login, register,refreshToken} from "../controllers/auth.js";
import {body} from "express-validator";
import {validate} from "../middleware/validate.js";
const router = express.Router();
router.post(
  "/login",
  [
    body("email").isEmail().notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  login
);

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("role").notEmpty().withMessage("Role is required"),
    body("companyId").notEmpty().withMessage("Company ID is required"),
  ],
  validate,
  register
);
router.post(
  "/refresh-token",
    refreshToken
);
export default router;