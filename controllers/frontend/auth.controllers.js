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
                        // html: `<h1>Click on the link to verify your email</h1><a href="">Verify</a>`
                        html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">
  <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <h1 style="color: #333; text-align: center;">Verify Your Email Address</h1>
    <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Thank you for registering with Ghazna Shop! To complete your registration, please verify your email address by clicking the button below:</p>
    <div style="text-align: center; margin-bottom: 20px;">
      <a href="${process.env.webURL}api/auth/users/verify/${token}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a>
    </div>
    <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">If you did not receive the email, please check your spam folder or click the button above to resend the verification email.</p>
    <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">If you have any questions or need assistance, feel free to contact our support team.</p>
    <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Best regards,<br>The Ghazna Shop Team</p>
    <div style="border-top: 1px solid #ddd; padding-top: 20px; text-align: center;">
      <p style="font-size: 14px; color: #777;">&copy; 2025 Ghazna Shop. All rights reserved.</p>
      <p style="font-size: 14px; color: #777;">1234 Market Street, Suite 100, Los Angeles, CA 90001</p>
    </div>
  </div>
</div>
                        
                        `
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

                const { id } = verifyToken;

                // console.log(verifyToken)
                if (!verifyToken) {
                    return sendErrResponse(res, false, "Token not valid", 400)
                }
                else {
                    const checkUser = await getUserById(id);

                    console.log(checkUser);


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

                                const newToken = generateJWTToken(payload, "10h")

                                return sendSuccessResponse(res, 200, true, { token:newToken }, "Token is valid")
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