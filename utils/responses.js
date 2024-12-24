export const sendSuccessResponse = (res, status, success, data, message) => {
    return res.status(status).json({
        success: success,
        data,
        message
    })
}


export const errResponse = (error, status, method) => {

    const err = new Error(error);
    err.status = status
    err.stack = error.stack
    err.type = error.type
    err.method = method

    throw err;
} 