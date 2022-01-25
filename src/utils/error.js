const createError = (code, msg, data = {}) => {
    if (!code || !msg) {
        throw new Error('code or msg is missing')
    }
    return {
        msg,
        code,
        data
    }
}

module.exports = createError