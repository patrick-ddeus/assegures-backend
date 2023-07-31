import 'dotenv/config'
import { CorsOptions } from 'cors'

const MODE = (process.env.MODE as keyof CorsWhiteList) || 'dev'

const allowedDomains: CorsWhiteList = {
  dev: [
    'http://localhost:3000/',
    'http://localhost:5000/',
    'https://localhost:3000/'
  ],
  prod: ['']
}

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      allowedDomains[MODE].includes(origin)
    ) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

type CorsWhiteList = {
  dev: string[]
  prod: string[]
}

export { corsOptions }
