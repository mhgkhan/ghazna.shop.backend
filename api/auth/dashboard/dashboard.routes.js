import express from "express";

const dashboardRouter = express.Router();

// dashboardRouter.post("/auth/signup", async (req, res) => {

// })
dashboardRouter.get("/auth/signin", async (req, res) => {
    res.status(200).render("dashboard/signin", { title: "Signin" });
})


export default dashboardRouter;