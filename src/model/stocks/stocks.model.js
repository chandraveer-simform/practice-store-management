const sql = require("../config");

const createStock = (newBrand) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO Stocks SET ?", newBrand, (err, elements) => {
            if (err) {
                return reject(err)
            }
            return resolve(newBrand)
        })
    })
}



const getStockDetailsById = ({ stock_id }) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM Stocks WHERE stock_id=${stock_id}`, (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(elements)
        })
    })
}


module.exports = { createStock, getStockDetailsById }