import express from "express";
import {
  createTask,
  listTasks,
  updateTask,
  deleteTask,
} from "../controllers/task";
import { body } from "express-validator";
import { validate } from "../middleware/validate";
import { auth } from "../middleware/auth";

const router = express.Router();
router.use(auth);
router.post(
  "/",
  body("title").isString().withMessage("title must be a string"),
  body("description").isString().withMessage("description must be a string"),
  body("status").isString().withMessage("status must be a string"),
  body("assignedTo").isString().withMessage("assignedTo must be a string"),
  body("projectId").isString().withMessage("projectId must be a string"),
  validate,
  createTask
);

router.get("/", listTasks);

router.put("/:id", updateTask);
router.delete(
  "/:id",
  (req, res, next) => {
    const { role } = req.user;
    if (role === "admin" || role === "manager") {
      return next();
    }
    return res.status(403).json({ message: "forbidden" });
  },
  deleteTask
);

export default router;
