const dotenv = require('dotenv')
const path = require('path')
let dotenvConfigOutput = dotenv.config({path: path.join(__dirname, '../.env')});
module.exports = dotenvConfigOutput.parsed