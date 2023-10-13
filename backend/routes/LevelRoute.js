import express from "express";
import {
  getAllLevels,
  getLevelByUUID,
  createLevel,
  updateLevel,
  deleteLevel,
} from "../controllers/Level";
import {
  verifyUser,
  adminOnly,
  unauthorizedAccess,
} from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/", verifyUser, getAllLevels);
router.get("/:uuid", verifyUser, getLevelByUUID);
router.post("/", verifyUser, adminOnly, unauthorizedAccess, createLevel);
router.patch("/:uuid", verifyUser, adminOnly, unauthorizedAccess, updateLevel);
router.delete("/:uuid", verifyUser, adminOnly, unauthorizedAccess, deleteLevel);

export default router;
