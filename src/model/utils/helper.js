/* eslint-disable semi */
const _ = require("lodash");

const objectReformatByKey = ({ keys, object }) => {
    let pickObj = { ...object }
    _.forIn(keys, function (value, key) {
        pickObj[key] = _.pick(pickObj, value)
        pickObj = { ..._.omit(pickObj, value) }
    });
    return { ...pickObj }
}

// On - Hold
const convertUrlToObj = (url) => {
    // var search = location.search.substring(1);
    // eslint-disable-next-line quotes
    let decodeURL = url.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"');
    console.log("url", decodeURL,url);
    return JSON.parse(decodeURI(url).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"'))
}

module.exports = { objectReformatByKey, convertUrlToObj }