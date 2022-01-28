const colors = require('colors')
const { red, green, yellow } = colors
const showError = (message) => {
  console.error(`\n ${red('Error: ')}${red(message)}\n`)
}
const showInfo = (message) => {
  console.info(`\n ${green('Info: ')}${green(message)}\n`)
}
const showWarning = (message) => {
  console.info(`\n ${yellow('Warning: ')}${yellow(message)}\n`)
}

module.exports = {
  showError,
  showInfo,
  showWarning
}
