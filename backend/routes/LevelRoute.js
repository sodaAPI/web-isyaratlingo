import express from "express";
import {
  getAllLevels,
  getLevelByUUID,
  createLevel,
  updateLevel,
  deleteLevel,
  getNextLearnSession,
  getNextLessonSession
} from "../controllers/Level.js";
import {
  verifyUser,
  adminOnly,
  unauthorizedAccess,
} from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/", verifyUser, getAllLevels);
router.get("/:uuid", verifyUser, getLevelByUUID);
router.post("/", verifyUser, adminOnly, unauthorizedAccess, createLevel);
router.post("/nextlearn/:uuid", verifyUser, getNextLearnSession);
router.post("/nextlesson/:uuid", verifyUser, getNextLessonSession);
router.patch("/:uuid", verifyUser, adminOnly, unauthorizedAccess, updateLevel);
router.delete("/:uuid", verifyUser, adminOnly, unauthorizedAccess, deleteLevel);

export default router;
