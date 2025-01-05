import { errResponse } from "../../utils/responses.js";

class GetRequestControllers {
    static handleSigninPage = async (req, res) => {
        try {
            res.status(200).render("dashboard/login", { title: "Signin", heading: "Signin to your account " });
            //  res.status(200).render("index", { title: "Signin", heading: "Signin to your account " });
        } catch (error) {
            return errResponse(error, 500, "GET")
        }
    }
}

export default GetRequestControllers