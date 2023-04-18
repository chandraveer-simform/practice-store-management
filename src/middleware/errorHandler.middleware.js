const { STATUS_CODE } = require("../utils/constants")
const { API_RES } = require("../utils/errorMessage")

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : STATUS_CODE.SERVER_ERROR

    switch (statusCode) {
        case STATUS_CODE.VALIDATION_ERROR: res.json({
            title: API_RES?.validation.title,
            message: err.message,
            stackTrace: err.stack,
        })
            break
        case STATUS_CODE.NOT_FOUND: res.json({
            title: API_RES?.not_found.title,
            message: err.message,
            stackTrace: err.stack,
        })
            break
        case STATUS_CODE.UNAUTHORIZED: res.json({
            title: API_RES?.unauthorized.title,
            message: err.message,
            stackTrace: err.stack,
        })
            break
        case STATUS_CODE.FORBIDDEN: res.json({
            title: API_RES?.forbidden.title,
            message: err.message,
            stackTrace: err.stack,
        })
            break
        case STATUS_CODE.SERVER_ERROR: res.json({
            title: API_RES?.server_error.title,
            message: err.message,
            stackTrace: err.stack,
        })
            break
        case STATUS_CODE.CONFLICT_ERROR: res.json({
            title: API_RES?.conflict_error.title,
            message: err.message,
            stackTrace: err.stack,
        })
            break
        default:
            console.log("No Error")
            break
    }
}

module.exports = errorHandler