const sql = require("../../config/database");
const { getJson } = require("../../helpers/helpers");

/***************** RDBMS SELECT QUERY **************/
const selectQuery = ({ queryName }) => {
    return new Promise((resolve, reject) => {
        sql.query(queryName, (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(getJson(elements))
        })
    })
}

module.exports = { selectQuery }