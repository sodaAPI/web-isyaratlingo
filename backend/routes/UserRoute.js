import express from "express";
import {
  getUserByUUID,
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  forgotPassword,
  resetPassword,
} from "../controllers/User.js";
import {
  verifyUser,
  adminOnly,
  unauthorizedAccess,
} from "../middleware/AuthUser.js";
import { checkDuplicateUsernameOrEmail } from "../middleware/verifySignUp.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many attempts, please try again later after 1 minutes",
});

router.get("/", verifyUser, adminOnly, unauthorizedAccess, getAllUsers);
router.get("/:uuid", verifyUser, adminOnly, unauthorizedAccess, getUserByUUID);
router.post("/", limiter, checkDuplicateUsernameOrEmail, createUser);
router.post("/forgotpassword", limiter, forgotPassword);
router.patch("/resetpassword/:token", limiter, resetPassword);
router.patch("/:uuid", verifyUser, updateUser);
router.delete("/:uuid", verifyUser, adminOnly, unauthorizedAccess, deleteUser);

export default router;
