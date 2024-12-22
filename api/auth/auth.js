import express from "express";

const authRoute = express.Router();

authRoute.get("/user", (req,res)=>res.status(200).json({success:true,message:"user is here"}))



export default authRoute

