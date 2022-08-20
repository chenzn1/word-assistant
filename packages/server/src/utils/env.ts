import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

export function envParser(...paths: string[]): Record<string, any> {
  const buf = fs.readFileSync(path.join(...paths))
  const config = dotenv.parse(buf)

  return config
}
