const sql = require("../config");

const createBrand = (newBrand) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO Brands SET ?", newBrand, (err, elements) => {
            if (err) {
                return reject(err)
            }
            return resolve(newBrand)
        })
    })
}

const getAllBrandsLists = () => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM Brands`, (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(elements)
        })
    })
}

const getBrandByBrandId = ({ brand_id }) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM Brands WHERE brand_id=${brand_id}`, (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(elements)
        })
    })
}


module.exports = { createBrand, getAllBrandsLists, getBrandByBrandId }