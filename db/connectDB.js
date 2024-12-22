import mongoose from "mongoose"


const connectDB = async (URI) =>{
   try {
     await mongoose.connect(URI);
   } catch (error) {
    return error;
   }
}

export default connectDB