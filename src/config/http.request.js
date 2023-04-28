const axios = require('axios');
const { ERROR_MESSAGE } = require('../utils/errorMessage'); 
const makeHttpRequest = ({ options }) => {
    console.log(options )
    return axios
        .request(options)
        .then(function (response) {
            return { ...response.data }
        })
        .catch(function (error) {
            throw new Error(error || ERROR_MESSAGE.something_wrong)
        });
}
 
module.exports = { makeHttpRequest }