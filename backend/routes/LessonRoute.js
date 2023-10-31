import express from "express";
import {
  getAllLesson,
  getLessonByUUID,
  createLesson,
  updateLesson,
  deleteLesson,
  upload,
} from "../controllers/Lesson.js";
import {
  verifyUser,
  adminOnly,
  unauthorizedAccess,
} from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/", verifyUser, getAllLesson);
router.get("/:uuid", verifyUser, getLessonByUUID);
router.post("/", verifyUser, adminOnly, unauthorizedAccess, upload, createLesson);
router.patch("/:uuid", verifyUser, adminOnly, unauthorizedAccess, upload, updateLesson);
router.delete("/:uuid", verifyUser, adminOnly, unauthorizedAccess, deleteLesson);

export default router;
