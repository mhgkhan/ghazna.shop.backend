import express from "express";
import { errResponse } from "../../../utils/responses.js";
import { RedirectDashboard } from "../../../middlewares/RedirectsMiddleWares.js";
import GetRequestControllers from "../../../controllers/dashboard/Admin/Controller.get.js";
import PostRequestControllers from "../../../controllers/dashboard/Admin/Controller.Post.js";

const dashboardRouter = express.Router();

// dashboardRouter.post("/auth/signup", async (req, res) => {

// })

// get routes 
dashboardRouter.get("/auth/signin", RedirectDashboard, GetRequestControllers.handleSigninPage)
dashboardRouter.get("/auth/signup", RedirectDashboard, GetRequestControllers.handleSignupPage)







// post routes 
dashboardRouter.post("/auth/signin", PostRequestControllers.handleSigninPost)
dashboardRouter.post("/auth/signin", PostRequestControllers.handlesignupPost)


export default dashboardRouter;






