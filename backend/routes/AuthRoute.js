import { Login, logOut, Me } from "../controllers/Auth.js";
import express from "express";
import rateLimit from "express-rate-limit";
import {
  verifyUser,
  adminOnly,
  unauthorizedAccess,
} from "../middleware/AuthUser.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 3,
  msg: "Too many login attempts, please try again later after 5 minutes",
});

router.get("/me", Me);
router.post("/login", loginLimiter, Login);
router.post("/loginadmin", loginLimiter, adminOnly);
router.delete("/logout", verifyUser, logOut);

export default router;
