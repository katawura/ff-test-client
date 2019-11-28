import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import post from "./post";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/posts", post);

export default routes;