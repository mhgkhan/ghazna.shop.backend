import dotenv from "dotenv"
dotenv.config();

import express from "express";
import authRoute from "./auth/auth.js";
import mongoose from "mongoose";
import cors from "cors";


const app = express();
app.use(cors())
console.log('cors enabled')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))



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