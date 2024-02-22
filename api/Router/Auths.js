import { Router } from "express";
import {
  acceptRequest,
  declineRequest,
  friendRequest,
  friendRequestDelete,
  getAlertValue,
  getAlertValue2,
  getAllUsers,
  getCurrentUser,
  getUserChangeInfo,
  login,
  logout,
  register,
  removeFriend,
} from "../Controller/Auth.js";
import multer from "multer";

var storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload2 = multer({ storage: storage2 });

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/get-alert-value", getAlertValue);
router.get("/get-alert-value2", getAlertValue2);
router.get("/get-current-user", getCurrentUser);
router.get("/get-all-users", getAllUsers);
router.post("/accept-request", acceptRequest);
router.post("/decline-request", declineRequest);
router.post("/remove-friend", removeFriend);
router.post(
  "/get-change-user-info",
  upload2.fields([{ name: "coverPicture" }, { name: "profilePicture" }]),
  getUserChangeInfo
);
router.post("/friend-request", friendRequest);
router.post("/friend-request-delete", friendRequestDelete);

export default router;
