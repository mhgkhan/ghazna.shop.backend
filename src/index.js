import express from "express"

const app = express();




const startServer = (PORT, MONGOOSEURI="") =>{
    app.listen(PORT, ()=>{
        console.log("SERVER STARTED PORT: "+PORT)
    })   
}

export default startServer