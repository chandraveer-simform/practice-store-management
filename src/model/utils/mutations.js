const sql = require("../../config/database");

const insertQuery = ({ queryName, values }) => {
    return new Promise((resolve, reject) => {
        sql.query(queryName, values, (err, elements) => {
            if (err) {
                return reject(err);
            }
            return resolve(values)
        })
    })
}


module.exports = { insertQuery }