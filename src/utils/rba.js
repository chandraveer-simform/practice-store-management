const { USER_ROLE } = require("./constants");

/***************** Define modules **************/

const MODULE = {
    stores: {
        name: "stores",
        value: "stores",
        baseUrl: "stores"
    },
    brands: {
        name: "brands",
        value: "brands",
        baseUrl: "brands"
    },
    products: {
        name: "products",
        value: "products",
        baseUrl: "products"
    }
};


/***************** Permission SET on module **************/

const PERMISSIONS = {
    [USER_ROLE.STORES_OWNER]: {
        [MODULE.stores.value]: {
            read: true,
            write: true,
            delete: true
        }
    },
    [USER_ROLE.STORES_OWNER]: {
        [MODULE.brands.value]: {
            read: true,
            write: true,
            delete: true
        }
    },
    [USER_ROLE.STORES_OWNER]: {
        [MODULE.products.value]: {
            read: true,
            write: true,
            delete: true
        }
    }
};


module.exports = { PERMISSIONS, MODULE };