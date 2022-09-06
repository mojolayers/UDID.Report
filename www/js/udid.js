/**
 * It extracts a valid UDID from a string.
 * @param udid - The UDID of the device you want to use.
 * @returns the first match of the regex.
 */
function extractValidUdid (udid) {
    const match = udid.match(/(0000[\d]{4}-00[A-Fa-f\d]+)|([a-fA-F\d]{40})/);

    if (match && match.length > 0) {
        return match[0];
    }
    else {
        return null
    }
}

function enrollDevice(response) {
    const udid = extractValidUdid(response);

    return udid;
}

