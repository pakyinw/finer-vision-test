import express from 'express'
import cors from 'cors'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './router'
import { port, sequelize, initDatabase } from './global'

// Close sequelize
export function shutDown() {
  sequelize?.close()
}

export async function main() {
  await initDatabase()

  // express implementation
  const app = express()

  app.use(
    cors({
      origin: '*',
    })
  )

  app.use((req, _res, next) => {
    // request logger
    console.log('⬅️ ', req.method, req.path, req.body ?? req.query)
    next()
  })

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
    })
  )

  app.listen(port)
}
