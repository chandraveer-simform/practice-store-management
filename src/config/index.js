const mysql = require("mysql")

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Chaotr$1.",
    database: "wcr"
})

conn.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("connected")
    }
})

module.exports = conn

