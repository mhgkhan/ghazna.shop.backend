import dotenv from "dotenv"
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dashboardRouter from "./auth/dashboard/dashboard.routes.js"
import path from "path";
import cookieParser from "cookie-parser";
import authRoute from "./auth/frontend/auth.js";

import nodemailer from "nodemailer"
import { transporterOpts } from "../config/MailObjs.js";



const app = express();
app.use(cors())
app.use(cookieParser())



app.use(express.static(path.join(process.cwd(), "/public")))




app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

app.use("/api/auth/", authRoute);
app.use("/app/admin/", dashboardRouter);

app.get("/", async (req, res) => {
    try {
        // await transporter.sendMail(mailOptions);
        res.status(200).json({ website: "https://ghazna.shop" })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
});





app.use((err, req, res, next) => {
    return res.status(err.status ?? 500).json({
        error: err.message,
        type: err.type,
        stack: err.stack,
        method: err.method,
    })
})







const DBURI = process.env.DB_URI

mongoose.connect(DBURI).then(data => {
    console.log('DATABASE CONNECTED')


}).catch(err => {
    console.log(err)
    process.exit(1)
})
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => console.log("SERVER ARE LISTENNING ON PORT " + PORT));

export default app;
