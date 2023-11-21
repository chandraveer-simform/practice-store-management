const express = require("express");
const bodyParser = require("body-parser");

const conn = require("./config/database");
const usersRouter = require("./routes/users.routes");
const productsRouter = require("./routes/products.routes");
const storesRouter = require("./routes/stores.routes");
const brandsRouter = require("./routes/brands.routes");

const { authUserAccess } = require("./middleware/checkAuth.middleware");
const errorHandler = require("./middleware/errorHandler.middleware");
const { MODULE } = require("./utils/rba");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(express.json())
// app.use(authUserAccess);

app.use("/users", usersRouter);
app.use(`/${[MODULE.stores.baseUrl]}`, authUserAccess([1, 2]), storesRouter);
app.use(`/${[MODULE.products.baseUrl]}`, authUserAccess([1, 2]), productsRouter);
app.use(`/${[MODULE.brands.baseUrl]}`, authUserAccess([1, 2]), brandsRouter);

app.get("/", (req, res) => {
    conn.query("select * from exam", (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.use(errorHandler);

// // catch 404 and forward to error handler
// eslint-disable-next-line no-unused-vars
app.use(function (req, res, next) {
    res.status(404).json({
        message: "No such route exists"
    });
});

// // error handler
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500).json({
//     message: "Error Message"
//   })
// });

app.listen(5000);
