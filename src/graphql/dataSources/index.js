/**
 * universal dataSources
 */
const UserAPI = require('./user')

const dataSources = () => {
  return {
    userAPI: new UserAPI()
  }
}

module.exports = dataSources
