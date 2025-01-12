import express from "express";
import authControllers from "../../../controllers/frontend/auth.controllers.js";
import { checkIfSigninSignupRecieveDataIsValid } from "../../../middlewares/validations.js";
import { verifyJWTToken } from "../../../utils/hasingAndTokens.js";
import { getUserById } from "../../../utils/dbOperations.js";
import RegisterUserModel from "../../../models/website/Register_accounts.js";

const authRoute = express.Router();

authRoute.get("/user", (req, res) => res.status(200).json({ success: true, message: "user is here" }))

authRoute.post("/users/register", checkIfSigninSignupRecieveDataIsValid, authControllers.handleRegister)
authRoute.get("/users/verify/:token", async (req, res) => {
    const token = req.params.token

    // console.log(token);


    try {

        if (!token) {
            return res.status(400).json({ success: false, message: "Token not found" })
        }

        else {
            const verifyToken = verifyJWTToken(token)

            // console.log(verifyToken);



            if (!verifyToken) {
                return res.status(400).json({ success: false, message: "Token not valid" })
            }

            else {
                const { id, verified } = verifyToken;

                if (verified) {
                    return res.status(400).json({ success: false, message: "Token already verified" })
                }

                else {

                    // checking if id is exists or not 
                    const checkUser = await getUserById(id);

                    if (!checkUser) {
                        return res.status(400).json({ success: false, message: "User not found" })
                    }
                    else {
                        // update is verified to true 
                        const updateUser = await RegisterUserModel.findOneAndUpdate({ _id: id }, { isVerified: true });

                        return res.status(200).send(`<h1>Token verified successfully</h1>`)
                    }


                }
            }
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }


})
authRoute.post("/users/signin", checkIfSigninSignupRecieveDataIsValid, authControllers.handleSignin)
authRoute.post("/users/checktoken", authControllers.handleCheckToken)



export default authRoute





