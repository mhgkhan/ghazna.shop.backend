import dotenv from "dotenv"
dotenv.config();

import express from "express";
import authRoute from "./auth/auth.js";
import mongoose from "mongoose";
import cors from "cors";


const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://ghazna.shop'); // Replace with your frontend URL
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors({ origin: 'https://ghazna.shop/' }))


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