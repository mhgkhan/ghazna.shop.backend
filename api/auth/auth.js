import express from "express";
import authControllers from "../../controllers/auth.controllers.js";
import { checkIfSigninSignupRecieveDataIsValid } from "../../middlewares/validations.js";

const authRoute = express.Router();

authRoute.get("/user", (req, res) => res.status(200).json({ success: true, message: "user is here" }))

authRoute.post("/users/register", checkIfSigninSignupRecieveDataIsValid, authControllers.handleRegister)
authRoute.post("/users/signin", checkIfSigninSignupRecieveDataIsValid, authControllers.handleSignin)
authRoute.post("/users/checktoken", authControllers.handleCheckToken)



export default authRoute

