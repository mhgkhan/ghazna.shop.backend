import express from "express";
import { sendResponse } from "../../utils/responses.js";
import RegisterUserModel from "../../models/RegisterUser.js";
import JsonWebToken from "jsonwebtoken"

const authRoute = express.Router();

authRoute.get("/user", (req, res) => res.status(200).json({ success: true, message: "user is here" }))

authRoute.post("/users/register", async (req, res) => {
   
    try {
        const body = req.body;
        if (body.email && body.email.length < 5 && body.password && body.password.length < 8) return sendResponse(res, 401, false, null, "email or password not valid")
    
    
        else {
            // checking if user is exists or not 
            const checkUser = await RegisterUserModel.findOne({ email: body.email });
            if (checkUser) return sendResponse(res, 400, false, null, "User already exists")
    
            else {
                // saving to the datbase 
                const document = new RegisterUserModel({email:body.email,password:body.password});
                await document.save();
                // creating token 
                const payload = {
                    email: document.email,
                    password : document.password
                }
                const token = JsonWebToken.sign(payload, process.env.JWT_SECRET_KEY);
    
                return sendResponse(res, 201, true, document, token)
             }
    
    
        }
    } catch (error) {
        return sendResponse(res, 500, false, null, error.message)
    }

})



export default authRoute

