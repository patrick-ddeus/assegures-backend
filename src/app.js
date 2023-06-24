import express from 'express'
import 'express-async-errors'
import 'dotenv/config'

import Routes from './routes/index.routes.js'
import errorHandler from './middlewares/error.middleware.js'

import cors from 'cors'
import corsOptions from './configs/cors.js'

const app = express()
const porta = process.env.PORTA || 5000

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(Routes)
app.use(errorHandler)

app.listen(porta, () =>
  console.log(`
    🚀 Servidor iniciado na porta ${porta}
`)
)
