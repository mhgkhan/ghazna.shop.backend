import bcrypt from "bcrypt"
import JsonWebToken from "jsonwebtoken"


// hash password 
export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return {
            ok: true,
            password: hashedPassword
        }
    } catch (error) {
        return { ok: false }
    }
}

// compare password
export const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        return false;
    }
}


// generate jwt token 
export const generateJWTToken = (payload, time) => {
    const token = JsonWebToken.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: time });
    return token;
}

// verify jwt token
export const verifyJWTToken = (token) => {
    try {
        const decoded = JsonWebToken.verify(token, process.env.JWT_SECRET_KEY);
        return decoded;
    } catch (error) {
        return false;
    }
}