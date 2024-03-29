export function safeJSONParse(stringifiedJSON) {
    let returnVal;

    try {
        returnVal = JSON.parse(stringifiedJSON);
    }
    catch(e) {
        console.log('Failed to parse stringified JSON.')
    }

    return returnVal;
}