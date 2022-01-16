const PUBLIC_PATH_REGEXP = /^\/public/

const UNLESS_ROUTERS = [
    'login',
    'register'
]

const unprotectedRoutes = [...UNLESS_ROUTERS.map(item => new RegExp(item)), PUBLIC_PATH_REGEXP]

module.exports = unprotectedRoutes