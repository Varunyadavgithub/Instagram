import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { addComment, bookmarkPost, createPost, deletePost, dislikePost, getAllPosts, getComments, getUserPost, likePost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/createpost", isAuthenticated, upload.single("image"), createPost);
router.get("/all",isAuthenticated,getAllPosts);
router.get("/userpost/all",isAuthenticated,getUserPost);
router.get("/:id/like",isAuthenticated,likePost);
router.get("/:id/dislike",isAuthenticated,dislikePost);
router.post("/:id/comment",isAuthenticated,addComment);
router.get("/:id/comment/all",isAuthenticated,getComments);
router.post("/delete/:id",isAuthenticated,deletePost);
router.get("/:id/bookmark",isAuthenticated,bookmarkPost);

export default router;
