const sql = require("../../config/database");


const selectQuery = ({ queryName }) => {
    return new Promise((resolve, reject) => {
        sql.query(queryName, (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(elements)
        })
    })
}

module.exports = { selectQuery }