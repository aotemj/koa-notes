/**
 * context can be obtained by any resolver
 * @param req
 * @returns {{foo: string}}  the params you defined which is used global
 */
const context = (req) => {
  return {
    foo: 'bar'
  }
}

module.exports = context
