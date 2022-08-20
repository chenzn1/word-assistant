import http from 'http'
import { createApp } from './app'
import { umzugUp } from './drivers'
import { logger } from './utils'

async function main() {
  await umzugUp()
  http.createServer(createApp().callback()).listen(3000, () => {
    logger.info(`Server started, port: 3000`)
  })
}
main()
