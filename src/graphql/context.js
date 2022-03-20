/**
 * context can be obtained by any resolver
 * @param req
 */
const context = (req) => {
  return {
    req
  }
}

module.exports = context
