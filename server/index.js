const app = require('./app')
const logger = require('./utils/logger')
require('dotenv').config({ path: './config/.env ' }) // Use .env file in config folder

app.listen(process.env.PORT, () => {
  logger.info(`Server is running on PORT ${process.env.PORT}`)
})