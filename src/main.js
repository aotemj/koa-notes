const app = require('./app')
const {PORT} = require('./config/config.default')

const port = PORT;

app.listen(port, () => {
    console.log(`server is running at ${port}`)
})