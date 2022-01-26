const createResponse = (code, message, data = {}) => {
  if (!code || !message) {
    throw new Error('code or msg is missing')
  }

  return {
    code,
    message,
    data
  }
}

module.exports = createResponse
