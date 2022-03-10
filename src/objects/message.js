function validateMessage(obj) {
    if (!obj.type || !obj.message) {
        throw new Error("not message")
    }
}

function message(type, message) {
    return {
        type: type,
        message: message
    }
} 

function defaultMessage(str) {
    if (typeof(str) != string) {
        throw new Error("str is not string")
    }
    return message("default", str)
} 

function componentMessage(component) {
    if (typeof(component) != object) {
        throw new Error("component is not object (json)")
    }
    return message("component", component)
}