export function serializeObj(obj) {
    var result = [];

    for (var property in obj) {
        result.push(encodeURIComponent(property) + '=' + encodeURIComponent(obj[property]));
    }

    return result.join('&');
}
