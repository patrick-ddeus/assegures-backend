import 'dotenv/config'

const MODE = process.env.MODE || 'dev'

const whiteList = {
  dev: ['http://localhost:3000/', 'https://localhost:3000/'],
  prod: []
}

const corsOptions = (req, callback) => {
  let corsConfigs
  if (whiteList[MODE].indexOf(req.header('Origin') !== -1)) {
    corsConfigs = { origin: true }
  } else {
    corsConfigs = { origin: false }
  }
  callback(null, corsConfigs)
}

export default corsOptions