const _ = require("lodash");

const objectReformatByKey = ({ keys, object }) => {
    let pickObj = { ...object }
    _.forIn(keys, function (value, key) {
        pickObj[key] = _.pick(pickObj, value)
        pickObj = { ..._.omit(pickObj, value) }
    });
    return { ...pickObj }
}

module.exports = { objectReformatByKey }