const app = require('./app')
const logger = require('./utils/logger')
require('dotenv').config({ path: './config/.env ' }) // Use .env file in config folder

// PORT Listening was moved to app.js to wait for mongo connection for cyclic deployment.

// app.listen(process.env.PORT, () => {
//   logger.info(`Server is running on PORT ${process.env.PORT}`)
// })