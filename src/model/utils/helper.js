/* eslint-disable semi */
const _ = require("lodash");

class commonHelper {

    /***************** Array of Object value as per the Key's  **************/
    arrOfObjectReformatByKey = async ({ keys, arrayOfObj }) => {
        let newArr = []
        for (let key in arrayOfObj) {
            let newObj = await this.objectReformatByKey({ keys, object: { ...arrayOfObj[key] } })
            newArr.push(newObj)
        }
        return newArr
    }

    /***************** Object value as per the Key's  **************/
    objectReformatByKey = ({ keys, object }) => {
        let pickObj = { ...object }
        _.forIn(keys, function (value, key) {
            pickObj[key] = _.pick(pickObj, value)
            pickObj = { ..._.omit(pickObj, value) }
        });
        return { ...pickObj }
    }

    // On - Hold
    convertUrlToObj = (url) => {
        // var search = location.search.substring(1);
        // eslint-disable-next-line quotes
        let decodeURL = url.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"');
        console.log("url", decodeURL, url);
        return JSON.parse(decodeURI(url).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"'))
    }
}


module.exports = new commonHelper