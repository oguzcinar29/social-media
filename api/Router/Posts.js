import { Router } from "express";
import multer from "multer";
import {
  addComment,
  deleteComment,
  deletePost,
  editCommentText,
  getAllPost,
  getLike,
  makePost,
} from "../Controller/Post.js";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });
const router = Router();

router.post("/make-post", upload.single("postFile"), makePost);
router.get("/get-all-post", getAllPost);
router.post("/get-like", getLike);
router.post("/delete-post", deletePost);
router.post("/get-comment", addComment);
router.post("/delete-comment", deleteComment);
router.post("/edit-comment-text", editCommentText);
export default router;
