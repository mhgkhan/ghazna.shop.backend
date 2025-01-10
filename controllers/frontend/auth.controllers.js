import { errResponse, sendErrResponse, sendSuccessResponse } from "../../utils/responses.js";
import { checkExistUserByEmail, getUserById, saveUser } from "../../utils/dbOperations.js";
import { comparePassword, generateJWTToken, hashPassword, verifyJWTToken } from "../../utils/hasingAndTokens.js";
import { sendMailing } from "../../config/MailObjs.js";


class authControllers {
    static handleRegister = async (req, res) => {
        try {
            const { email, password } = req.body;
            // checking if user is exists or not 
            const checkUser = await checkExistUserByEmail(email);
            if (!checkUser) {
                // hashing the password with bcrypt 
                const hashingPassword = await hashPassword(password)
                if (hashingPassword.ok) {
                    // saving data to the database
                    const savingUser = await saveUser(email, hashingPassword.password)
                    if (!savingUser.ok) {
                        return errResponse("Error in saving user", 500, "POST")
                    }
                    const document = savingUser.document;
                    // creating token
                    const token = generateJWTToken({ id: document._id, verified: false }, "10h");

                    const sendMail = await sendMailing({
                        from: process.env.EMAIL,
                        to: document.email,
                        subject: "VERIFY YOUR ACCOUNT (ghazna.shop)",
                        text: "",
                        html: `<h1>Click on the link to verify your email</h1><a href="${process.env.webURL}api/auth/users/verify/${token}">Verify</a>`
                    })
                    return sendSuccessResponse(res, 201, true, { token }, "User registered successfully")
                }
                else {
                    return errResponse("Error in hashing password", 500, "POST")
                }
            }
            else {
                return sendErrResponse(res, false, "User already exists", 409)
            }
        } catch (error) {
            return errResponse(error, 500, "POST")
        }
    }


    // creating handler for signin (login) with validation and check if user is verify or not, token, comparing password
    static handleSignin = async (req, res) => {
        try {
            const { email, password } = req.body;
            // checking if user is exits or not 
            const checkUser = await checkExistUserByEmail(email);
            if (!checkUser) {
                return sendErrResponse(res, false, "User not found", 400)
            }
            else {
                // check the uer password 
                const compareUserPassword = await comparePassword(password, checkUser.user?.password)
                if (!compareUserPassword) {
                    return sendErrResponse(res, false, "invilid credientials", 400)
                }
                else {
                    // creating token
                    const token = generateJWTToken({ id: checkUser.user._id, verified: checkUser.user.verified }, "10h");
                    return sendSuccessResponse(res, 200, true, { token }, "User logged in successfully")
                }
            }
        } catch (error) {
            return errResponse(error, 500, "POST")
        }
    }

    static handleCheckToken = async (req, res) => {
        try {
            const { token } = req.body;
            if (!token || token == undefined || token.length < 10) {
                return sendErrResponse(res, false, "Token not found", 400)
            }
            else {
                const verifyToken = verifyJWTToken(token);
                if (!verifyToken) {
                    return sendErrResponse(res, false, "Token not valid", 400)
                }
                else {
                    const checkUser = await getUserById(id);
                    if (!verifyToken.verified) {

                        if (!checkUser) {
                            return sendErrResponse(res, false, "Token not verified", 400)
                        }
                        else {
                            if (!checkUser.isVerified) {
                                return sendErrResponse(res, false, "Token not verified", 400)
                            }
                            else {

                                const payload = {
                                    id: checkUser._id,
                                    verified: true
                                }

                                return sendSuccessResponse(res, 200, true, { token }, "Token is valid")
                            }
                        }

                    }




                }
            }
        } catch (error) {
            return errResponse(error, 500, "POST")
        }
    }

}

export default authControllers