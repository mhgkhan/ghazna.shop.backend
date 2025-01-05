import mongoose from "mongoose";

const defType = {
    type: String,
    required: true
}

const userSchema = mongoose.Schema({
    email: {
        ...defType,
        unique: true
    },
    password: defType,
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        ...defType,
        default: "user"
    }
}, {
    timestamps: true
})


const RegisterUserModel = mongoose.model("registeruser", userSchema)
export default RegisterUserModel


