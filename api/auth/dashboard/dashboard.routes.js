import express from "express";
import { errResponse } from "../../../utils/responses.js";

const dashboardRouter = express.Router();

// dashboardRouter.post("/auth/signup", async (req, res) => {

// })
dashboardRouter.get("/auth/signin", async (req, res) => {
   try {
    res.status(200).render("dashboard/login", { title: "Signin", heading: "Signin to your account " });
   //  res.status(200).render("index", { title: "Signin", heading: "Signin to your account " });
   } catch (error) {
    return errResponse(error, 500, "GET")
   }
})


export default dashboardRouter;