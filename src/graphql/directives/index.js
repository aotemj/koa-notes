const directiveNames = require('./directiveName')

const usersDirectiveTransforms = require('./user')

module.exports = {
  ...usersDirectiveTransforms,
  directiveNames
}
