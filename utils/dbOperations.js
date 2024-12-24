import RegisterUserModel from "../models/RegisterUser.js"

export const checkExistUserByEmail = async (email) => {
    const checkUser = await RegisterUserModel.findOne({ email });
    return checkUser ? true : false;
}

export const checkExistUserById = async (id) => {
    const user = await RegisterUserModel.findById(id);
    return user ? true : false;
}

export const saveUser = async (email, password) => {
    try {
        const document = new RegisterUserModel({ email, password });
        await document.save();
        return {
            ok: true,
            document
        }
    } catch (error) {
        return {
            ok: false
        }
    }
}

export const getUserByEmail = async (email) => {
    const user = await RegisterUserModel.findOne({ email });
    return user;
}


