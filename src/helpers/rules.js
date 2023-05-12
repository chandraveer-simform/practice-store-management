// Validation Rules methods

class RulesMethod {
    // URL's
    URLStringToArray({ str, pattern }) { 
        return str.split(pattern);
    }

    // String
    SingleValueReplace({ str, pattern, newReplace = "" }) {
        return str.replace(pattern, newReplace);
    }

    //Pattarn 
    GenerateSinglePattarn({ value }) {
        return `/${value}/g`;
    }
}

module.exports = new RulesMethod;

