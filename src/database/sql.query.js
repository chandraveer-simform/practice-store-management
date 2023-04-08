const sql = require("../config");

const selectSQLQuery = ({queryName}) => {
    console.log("Dd",queryName)

    return new Promise((resolve, reject) => {
        sql.query(queryName, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

module.exports = { selectSQLQuery }