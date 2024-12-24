import { sendErrResponse } from "../utils/responses.js"

export const checkIfSigninSignupRecieveDataIsValid = (req, res, next) => {
    if (!req.body.email || req.body.email.length < 5) {
        return sendErrResponse(res, false, "Email not valid", 400)
    }
    if (!req.body.password || req.body.password.length < 8) {
        return sendErrResponse(res, false, "Password not valid", 400)
    }
    else {
        return next()
    }
}