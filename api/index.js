import express from "express";
import os from "os"
import cluster from "cluster"
import authRoute from "./auth/auth.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use((req, res, next) => {
    req.user = req.headers.location;
    next();
})

app.use("/api/auth/", authRoute)

app.get("/", (req, res) => {
    res.status(200).json({ message: "hello world" })
});






if (cluster.isPrimary) {
    for (let i = 0; i < os.cpus().length; i++) cluster.fork()
}
else {
    const DBURI = process.env.DB_URI

    mongoose.connect(DBURI).then(data => {
        console.log('DATABASE CONNECTED')

        const PORT = process.env.PORT || 8090;
        app.listen(PORT, () => console.log("SERVER ARE LISTENNING ON PORT "+PORT));

    }).catch(err => {
        console.log(err)
        process.exit(1)
    })
}
export default app;