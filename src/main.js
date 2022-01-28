const app = require('./app')
const { showInfo } = require('./utils/showLog')

const { PORT } = require('./config/config.default')

const port = PORT

app.listen(port, () => showInfo(`Success: server is running at ${port}`))
