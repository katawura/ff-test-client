import { Router } from "express";
import PostController from "../controllers/PostController";

const router = Router();

//Get all post
router.get("/", PostController.listAll);

//Like a post
router.post("/:id([0-9]+)/like", PostController.likePost);

//Create a new post
router.post("/", PostController.newPost);

//Edit one post
router.patch(
    "/:id([0-9]+)",
    PostController.editPost
);

//Delete one post
router.delete(
    "/:id([0-9]+)",
    PostController.deletePost
);

export default router;