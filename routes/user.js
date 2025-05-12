import express from "express";
import {createUser, deleteUser, getAllUsers, getUserById, updateUser} from "../controllers/user.js";
import {body} from "express-validator";
import {validate} from "../middleware/validate.js";
import { authenticate,authorizeRoles } from "../middlewares/auth.js";
const router = express.Router();
router.use(authenticate);
router.post(
  "/create",
  authorizeRoles("admin"),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("role").isIn(['Admin','Manager','Member']).notEmpty().withMessage("Role is required"),
    body("companyId").notEmpty().withMessage("Company ID is required"),
  ],
  validate,
  createUser
);
router.get(
  "/getAll",
  authorizeRoles("admin"),
  getAllUsers
);
router.get(
  "/get/:id",
  authorizeRoles("admin"),
  getUserById
);
router.put(
  "/update/:id",
  authorizeRoles("admin"),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("role").isIn(['Admin','Manager','Member']).notEmpty().withMessage("Role is required"),
    body("companyId").notEmpty().withMessage("Company ID is required"),
  ],
  validate,
  updateUser
);
router.delete(
  "/delete/:id",
  authorizeRoles("admin"),
  deleteUser
);
export default router;