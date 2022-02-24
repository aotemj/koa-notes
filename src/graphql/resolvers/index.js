const { mergeAll } = require('ramda')

const userResolvers = require('./user')

const resolvers = {}

module.exports = mergeAll([resolvers, userResolvers])
