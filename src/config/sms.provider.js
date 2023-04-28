const { makeHttpRequest } = require("./http.request");
/**
 *
 * @param authKey
 * @param senderId
 * @param route : Value can be 1 for Promotional Router or 4 for Transactional Route or 106 for SendOTP
 * @param DLT_TE_ID : Issued DLT template from TRAI
 */
module.exports = function ({ authKey, senderId, route }) {
    if (authKey == null || authKey == "") {
        throw new Error("MSG91 Authorization Key not provided.");
    }

    if (senderId == null || senderId == "") {
        throw new Error("MSG91 Sender Id is not provided.");
    }

    if (route == null || route == "") {
        throw new Error("MSG91 router Id is not provided.");
    }

    this.send = async ({ mobileNos, message }) => {
        let url = "https://control.msg91.com/api/v5/otp?";
        mobileNos = validateMobileNos(mobileNos);
        message = validateMessage(message);

        var isUnicode = isUnicodeString(message);
        var postUrlData = `template_id=&mobile=${mobileNos}&otp=${message}`;

        if (isUnicode) {
            postUrlData += "&unicode=1";
        }
        var options = {
            url: `${url}${postUrlData}`,
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                authKey: authKey,
            }
        };
        return await makeHttpRequest({ options });
    };

    this.resend = async ({ mobileNos, message }) => {
        let url = "https://control.msg91.com/api/v5/otp/retry?";

        mobileNos = validateMobileNos(mobileNos);
        message = validateMessage(message);

        var isUnicode = isUnicodeString(message);
        var postUrlData = `authkey=${authKey}&mobile=${mobileNos}&retrytype=${message}`;

        if (isUnicode) {
            postUrlData += "&unicode=1";
        }
        var options = {
            url: `${url}${postUrlData}`,
            method: "POST",
            headers: {
                accept: "application/json",
                authKey: authKey,
            }
        };
        return await makeHttpRequest({ options });
    };

    this.verify = async ({ mobileNos, message }) => {

        let url = "https://control.msg91.com/api/v5/otp/verify?";

        mobileNos = validateMobileNos(mobileNos);
        message = validateMessage(message);

        var isUnicode = isUnicodeString(message);
        var postUrlData = `otp=${message}&mobile=${mobileNos}`;

        if (isUnicode) {
            postUrlData += "&unicode=1";
        }
        var options = {
            url: `${url}${postUrlData}`,
            method: "GET",
            headers: {
                accept: "application/json",
                authKey: authKey,
            }
        };
        return await makeHttpRequest({ options });
    };

    this.getBalance = function (customRoute, callback) {

        if (arguments.length == 1) {
            callback = customRoute;
            customRoute = null;
        }

        callback = modifyCallbackIfNull(callback);

        var currentRoute = customRoute || route;

        var options = {
            hostname: "control.msg91.com",
            port: 80,
            path: "/api/balance.php?authkey=" + authKey + "&type=" + currentRoute,
            method: "GET"
        };

        makeHttpRequest(options, null, function (err, data) {
            callback(err, data);
        });

    };

    return this;

};

function validateMobileNos(mobileNos) {

    if (mobileNos == null || mobileNos == "") {
        throw new Error("MSG91 : Mobile No is not provided.");
    }

    if (mobileNos instanceof Array) {
        mobileNos = mobileNos.join(",");
    }

    return mobileNos;
}

function validateMessage(message) {

    if (message == null || message == "") {
        throw new Error("MSG91 : message is not provided.");
    }

    return message;
}

function modifyCallbackIfNull(callback) {
    return callback || function () { };
}

function isUnicodeString(str) {
    for (var i = 0, n = str.length; i < n; i++) {
        if (str.charCodeAt(i) > 255) { return true; }
    }
    return false;
}
