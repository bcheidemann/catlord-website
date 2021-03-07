exports.sanitiseUser = function (user) {
    return {
        ...user,
        password: null,
    }
}