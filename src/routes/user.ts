import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

//Get all users
router.get("/", UserController.listAll);

//Create a new user
router.post("/", [checkJwt], UserController.newUser);

//Edit one user
router.patch(
    "/:id([0-9]+)",
    [checkJwt],
    UserController.editUser
);

//Delete one user
router.delete(
    "/:id([0-9]+)",
    [checkJwt],
    UserController.deleteUser
);

export default router;