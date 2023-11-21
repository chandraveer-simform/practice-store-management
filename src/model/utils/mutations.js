const sql = require("../../config/database");
const { getJson } = require("../../helpers/helpers");

/***************** RDBMS INSERT QUERY **************/
const insertQuery = ({ queryName, values }) => {
    return new Promise((resolve, reject) => {
        sql.query(queryName, values, (err, elements) => {
            if (err) {
                return reject(err);
            }
            return resolve({ elements: getJson(elements), data: { ...values } })
        })
    })
}

/***************** RDBMS DELETE QUERY **************/
const deleteQuery = ({ queryName, values }) => {
    return new Promise((resolve, reject) => {
        sql.query(queryName, (err, elements) => {
            if (err) {
                return reject(err);
            }
            return resolve({ elements: getJson(elements), data: { ...values } })
        })
    })
}

module.exports = { insertQuery, deleteQuery }
