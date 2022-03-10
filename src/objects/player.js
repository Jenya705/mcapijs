function validateID(id) {
    if (typeof(id) != string || 
        !(isUsername(id) || isUUID(id))
    ) {
        throw new Error("not player id")
    }
}

const uuidRE = new RegExp("([0-9a-f]{32})|([0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12})")

function validateUUID(uuid) {
    if (!isUUID(uuid)) {
        throw new Error("not uuid")
    }
} 

function isUUID(id) {
    return uuidRE.match(id).length !== id.length
}

function isUsername(username) {
    return username.length >= 3 && username.length <= 16
}