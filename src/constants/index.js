const createResponse = require("../utils/response");
const MSG_CODE = {
    CODE0: '00000',
    CODE1: '00001',
    CODE2: '00002',
    CODE3: '00003',
    CODE4: '00004',
    CODE5: '00005',
}

const ERRORS = {
    USER_ALREADY_EXIST: createResponse(MSG_CODE.CODE1, 'User is already exist'),
    USER_MISSING_REQUIRE_WORDS: createResponse(MSG_CODE.CODE2, 'Email、name or password is missing'),
    USER_NOT_EXIST: createResponse(MSG_CODE.CODE3, 'User doesn\'t exist'),
    USER_LOGIN_ERROR: createResponse(MSG_CODE.CODE4, 'The username or password is incorrect')
}

const HTTP_CODE = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UN_AUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
}
module.exports = {
    MSG_CODE,
    HTTP_CODE,
    ERRORS
}