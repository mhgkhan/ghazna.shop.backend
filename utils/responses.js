export const sendResponse = (res, status, success, data, message) => {
    return res.status(status).json({
        success: success,
        data,
        message
    })
}
