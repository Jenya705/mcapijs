function asPath(path) {
    if (typeof(path) === 'string') {
        return path
    }
    end_path = ""
    for (let i = 0; i < path.length;) {
        end_path += path[i]
        if (++i != path.length) end_path += ":"
    }
    return end_path
}

exports.asPath = asPath