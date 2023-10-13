import express from "express";
import {
  getVocabByUUID,
  createVocab,
  updateVocab,
  deleteVocab,
  getAllVocabs,
  upload,
} from "../controllers/Dictionary.js";

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

router.get("/", verifyUser, getAllVocabs);
router.get("/:uuid", verifyUser, getVocabByUUID);
router.post("/", verifyUser, adminOnly, unauthorizedAccess, upload, createVocab);
router.patch("/:uuid", verifyUser, adminOnly, unauthorizedAccess, upload, updateVocab);
router.delete("/:uuid", verifyUser, adminOnly, unauthorizedAccess, deleteVocab);

export default router;
