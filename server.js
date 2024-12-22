import cluster from "cluster"
import os from "os"
import startServer from "./src/index.js";


const cpusLength = os.cpus().length;

if(cluster.isPrimary){
    for(let i =0; i<cpusLength; i++){
        cluster.fork();
    }
}
else{
    // console.log("hello world ")
    const PORT = process.env.PORT || 8090;
    startServer(PORT)
}