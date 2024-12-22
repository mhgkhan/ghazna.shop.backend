import express from "express";
import os from "os"
import cluster from "cluster"
import authRoute from "./auth/auth.js";

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use((req,res,next)=>{
    req.user = req.headers.location;
    next();
})

app.use("/api/auth/", authRoute)


app.get("/", (req, res) => {
    res.status(200).json({message: "hello world" })
});

if (cluster.isPrimary) {
    for (let i = 0; i < os.cpus().length; i++) cluster.fork()
}
else {
    app.listen(3090, () => console.log("Server ready on port 3090."));
}
export default app;