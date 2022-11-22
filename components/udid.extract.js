/* UDID.Extract() */
function extract (udid){
    const match = udid.match(/(0000[\d]{4}-00[A-Fa-f\d]+)|([a-fA-F\d]{40})/);

    if (match && match.length > 0) {
        return match[0];
    } else {
        return null;
    }
}

module.exports = { extract };