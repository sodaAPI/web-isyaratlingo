import express from "express";
import {
getAllLearn, 
getLearnByUUID, 
createLearn, 
updateLearn, 
deleteLearn,
upload,
} from "../controllers/Learn.js";
import {
  verifyUser,
  adminOnly,
  unauthorizedAccess,
} from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/", verifyUser, getAllLearn);
router.get("/:uuid", verifyUser, getLearnByUUID);
router.post("/", verifyUser, adminOnly, unauthorizedAccess, upload, createLearn);
router.patch("/:uuid", verifyUser, adminOnly, unauthorizedAccess, upload, updateLearn);
router.delete("/:uuid", verifyUser, adminOnly, unauthorizedAccess, deleteLearn);

export default router;
