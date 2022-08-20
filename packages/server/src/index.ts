import http from 'http'
import { createApp } from './app'

http.createServer(createApp().callback()).listen(3000)
