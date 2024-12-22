import cluster from "cluster"
import os from "os"


const cpusLength = os.cpus().length;

if(cluster.isPrimary){
    for(let i =0; i<cpusLength; i++){
        cluster.fork();
    }
}
else{
    console.log("hello world ")
}