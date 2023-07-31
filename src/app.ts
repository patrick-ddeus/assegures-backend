import express, { Express } from 'express'
import 'express-async-errors'

import Routes from '@/routes/index.routes'
import { errorHandler } from '@/middlewares'

import cors from 'cors'
import { corsOptions } from '@/configs'
import { connectDb, disconnectDb } from '@/configs'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(Routes)
app.use(errorHandler)

export async function init(): Promise<Express> {
  connectDb()
  return Promise.resolve(app)
}

export async function close(): Promise<void> {
  await disconnectDb()
}

export default app
