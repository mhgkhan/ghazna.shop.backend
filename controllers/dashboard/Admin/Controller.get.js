import { errResponse } from "../../../utils/responses.js";

class GetRequestControllers {
    static handleSigninPage = async (req, res) => {
        try {
            // console.log(req.ip)
            res.status(200).render("admin/login", { title: "Signin", heading: "Signin to your account " });
            //  res.status(200).render("index", { title: "Signin", heading: "Signin to your account " });
        } catch (error) {
            return errResponse(error, 500, "GET")
        }
    }
    


    static handleSignupPage = async (req, res) => {
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        if (ip === process.env.ip) {
            try {
                res.status(200).render("admin/signup", { title: "Signup", heading: "Create an account " });
            } catch (error) {
                return errResponse(error, 500, "GET")
            }
        }
        else {
            return res.status(403).send("Forbidden")
        }
    }
}

export default GetRequestControllers