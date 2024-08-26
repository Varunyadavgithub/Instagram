import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { getMessage, sendMessage } from "../controllers/message.controller.js";

const route=express.Router();

route.post("/send/:id",isAuthenticated,sendMessage);
route.get("/all/:id",isAuthenticated,getMessage);

export default route;