const API_RES = {
    validation: {
        title: "Validation Failed"
    },
    not_found: {
        title: "Node Found"
    },
    unauthorized: {
        title: "Unauthorized"
    },
    forbidden: {
        title: "Forbidden"
    },
    server_error: {
        title: "Server Error"
    },
    conflict_error: {
        title: "Conflict Error"
    }
}

const ERROR_MESSAGE = {
    mandatory_all_fields: "All fields are mandatory!",
    unauthorized_invalid_login: "Invalid username/password!",
    unauthorized_invalid_user: "Invalid username!",
    unauthorized_invalid_pass: "Invalid password!",
    unauthorized_access_denied: "Access Denied!, no token entered",
    unauthorized_auth_token_denied: "auth failed, check auth-token222",
    user_already_exist: "This user is already in use!",
    something_wrong: "Something went wrong!",
    data_creating_error: "Some error occurred while creating.",
    records_not_found: "Records not found."
}
module.exports = { API_RES, ERROR_MESSAGE }