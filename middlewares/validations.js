export const checkIfSigninSignupRecieveDataIsValid = (req, res, next) => {
    if (!body.email || body.email.length < 5) {
        return sendErrResponse(res, false, "Email not valid", 400)
    }
    if (!body.password || body.password.length < 8) {
        return sendErrResponse(res, false, "Password not valid", 400)
    }
    else {
        next()
    }
}