import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import Routes from './routes/index.routes.js'

const app = express()
const porta = process.env.PORTA || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(Routes)

app.listen(porta, () =>
  console.log(`
    🚀 Servidor iniciado na porta ${porta}
`)
)
