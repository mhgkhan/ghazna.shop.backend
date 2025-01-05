import express from "express";
import { errResponse } from "../../../utils/responses.js";
import { RedirectDashboard } from "../../../middlewares/RedirectsMiddleWares.js";
import GetRequestControllers from "../../../controllers/dashboard/Controller.get.js";

const dashboardRouter = express.Router();

// dashboardRouter.post("/auth/signup", async (req, res) => {

// })
dashboardRouter.get("/auth/signin", RedirectDashboard, GetRequestControllers.handleSigninPage)
dashboardRouter.get("/auth/signup", RedirectDashboard, GetRequestControllers.handleSignupPage)

export default dashboardRouter;

