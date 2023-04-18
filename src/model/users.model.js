const sql = require("../config");

const createUser = (newUsers) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO Users SET ?", newUsers, (err, elements) => {
            if (err) {
                return reject(err);
            }
            return resolve(newUsers)
        })
    })
}

const checkExistUser = (data) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM Users WHERE LOWER(mobile) = LOWER(${sql.escape(
            data
        )});`, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

const getUserById = ({ uid }) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM Users WHERE uid=${uid}`, (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(elements)
        })
    })
}

const getAllUserLists = () => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM Users`, (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(elements)
        })
    })
}


module.exports = { createUser, checkExistUser, getUserById, getAllUserLists }