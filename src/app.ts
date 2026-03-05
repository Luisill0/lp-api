import express from 'express'
import type { Express } from 'express'
import visitRouter from './router/visit.router'

export const app: Express = express()

app.use(express.json())

app.use("/visit", visitRouter)

app.get('/', (_, res) => res.sendStatus(200))
