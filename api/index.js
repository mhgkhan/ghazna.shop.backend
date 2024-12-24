import dotenv from "dotenv"
dotenv.config();

import express from "express";
import authRoute from "./auth/auth.js";
import mongoose from "mongoose";
import cors from "cors";


const app = express();


// implementing cors 
const allowedOrigins = ['http://ghazna.shop', 'http://localhost:5173','https://ghazna.shop', 'https://www.ghazna.shop'];
const corsOptions = { origin: function (origin, callback) { if (!origin || allowedOrigins.indexOf(origin) !== -1) { callback(null, true); } else { callback(new Error('Not allowed by CORS')); } } };
app.use(cors(corsOptions))


app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use((req, res, next) => {
    req.user = req.headers.location;
    next();
})

app.use("/api/auth/", authRoute)

app.get("/", (req, res) => {
    res.status(200).json({ website: "https://ghazna.shop" })
});







app.use((err, req, res, next) => {
    return res.status(err.status).json({
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

// if (cluster.isPrimary) {
//     for (let i = 0; i < os.cpus().length; i++) cluster.fork()
// }
// else {
// }
export default app;