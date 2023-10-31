import express from "express";
import {
  getItemByUUID,
  createItem,
  updateItem,
  deleteItem,
  getAllItems,
  buyItem,
  upload
} from "../controllers/Shop.js";
import {
  verifyUser,
  adminOnly,
  unauthorizedAccess,
} from "../middleware/AuthUser.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many attempts, please try again later after 1 minutes",
});

router.get("/", verifyUser, getAllItems);
router.get("/:uuid", verifyUser, getItemByUUID);
router.post("/", limiter, verifyUser, adminOnly, unauthorizedAccess, upload, createItem);
router.post("/buy/:uuid", verifyUser, buyItem);
router.patch("/:uuid", verifyUser, adminOnly, unauthorizedAccess, upload, updateItem);
router.delete("/:uuid", verifyUser, adminOnly, unauthorizedAccess, deleteItem);

export default router;
