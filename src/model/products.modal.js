const sql = require("../config");


const createProduct = (newProduct) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO Products SET ?", newProduct, (err, elements) => {
            if (err) {
                return reject(err)
            }
            return resolve(newProduct)
        })
    })
}


const getAllProductsLists = () => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM Products INNER JOIN Brands ON Products.brand_id = Brands.brand_id`, (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(elements)
        })
    })
}


const getProductByProductId = ({ product_id }) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM Products WHERE product_id=${product_id}`, (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(elements)
        })
    })
}


module.exports = { createProduct, getAllProductsLists, getProductByProductId }