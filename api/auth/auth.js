import express from "express";
import authControllers from "../../controllers/auth.controllers.js";

const authRoute = express.Router();

authRoute.get("/user", (req, res) => res.status(200).json({ success: true, message: "user is here" }))

authRoute.post("/users/register", authControllers.handleRegister)



export default authRoute

