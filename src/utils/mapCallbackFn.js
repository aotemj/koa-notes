const createMiddleware = (type, schema, middleware) => {
  return {
    [type]: {
      [schema]: middleware
    }
  }
}

const mapCallbackFn = (type, schema) => (middleware) => createMiddleware(type, schema, middleware)

module.exports = {
  mapCallbackFn
}
