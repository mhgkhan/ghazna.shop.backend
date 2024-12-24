import { errResponse, sendSuccessResponse } from "../utils/responses.js";
import RegisterUserModel from "../models/RegisterUser.js";
import JsonWebToken from "jsonwebtoken"


class authControllers {
    static handleRegister = async (req, res) => {

        try {
            const body = req.body;
            if (body.email && body.email.length < 5 && body.password && body.password.length < 8) return sendSuccessResponse(res, 401, false, null, "email or password not valid")


            else {
                // checking if user is exists or not 
                const checkUser = await RegisterUserModel.findOne({ email: body.email });
                if (checkUser) return sendSuccessResponse(res, 400, false, null, "User already exists")

                else {
                    // saving to the datbase 
                    const document = new RegisterUserModel({ email: body.email, password: body.password });
                    await document.save();
                    // creating token 
                    const payload = {
                        email: document.email,
                        password: document.password
                    }
                    const token = JsonWebToken.sign(payload, process.env.JWT_SECRET_KEY);

                    return sendSuccessResponse(res, 201, true, document, token)
                }


            }
        } catch (error) {
            return errResponse(error, 500, "POST")
        }

    }



    // handle signin 
}

export default authControllers