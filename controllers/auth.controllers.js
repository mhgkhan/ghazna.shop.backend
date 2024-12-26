import { errResponse, sendErrResponse, sendSuccessResponse } from "../utils/responses.js";
import { checkExistUserByEmail, getUserByEmail, saveUser } from "../utils/dbOperations.js";
import { comparePassword, generateJWTToken, hashPassword } from "../utils/hasingAndTokens.js";


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
                    const token = generateJWTToken({ id: document._id }, "10h");
                    return sendSuccessResponse(res, 201, true, { token, verified:false }, "User registered successfully")
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
                return sendErrResponse(res, false, "User not found", 404)
            }

            else {

                // check the uer password 
                const compareUserPassword = await comparePassword(password, checkUser.user?.password)
                if (!compareUserPassword) {
                    return sendErrResponse(res, false, "invilid credientials", 400)
                }

                else {

                    // check if user is verify or not 
                    if (checkUser.user.isVerified) {
                        // creating token
                        const token = generateJWTToken({ id: checkUser.user._id }, "10h");
                        return sendSuccessResponse(res, 200, true, { token }, "User logged in successfully")
                    }
                    else {
                        return sendSuccessResponse(res, 200, true, { token, verifed:false }, "User logged in successfully")
                    }

                }


            }




        } catch (error) {
            return errResponse(error, 500, "POST")
        }
    }
}

export default authControllers