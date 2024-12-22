import express from "express"

const app = express();


app.get("/", (req,res)=>{
    return res.json({
        success:true
    })
})


// const startServer = (PORT, MONGOOSEURI="") =>{
//     app.listen(PORT, ()=>{
//         console.log("SERVER STARTED PORT: "+PORT)
//     })   
// }

export default app