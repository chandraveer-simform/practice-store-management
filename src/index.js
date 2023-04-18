const express = require("express")
const bodyParser = require('body-parser')

const conn = require("./config")
const usersRouter = require('./routes/users.routes');
const productsRouter = require('./routes/products.routes');
const brandsRouter = require('./routes/brands.routes');

const errorHandler = require('./middleware/errorHandler.middleware')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(express.json())

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/brands', brandsRouter);

app.get("/", (req, res) => {
    conn.query("select * from exam", (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})

app.use(errorHandler);

// // catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).json({
        message: "No such route exists"
    })
});

// // error handler
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500).json({
//     message: "Error Message"
//   })
// });

app.listen(5000)