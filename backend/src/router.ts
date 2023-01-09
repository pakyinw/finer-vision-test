import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { list, create, dbZodType } from './database'

export const trpc = initTRPC.create()
const router = trpc.router
const publicProcedure = trpc.procedure

// root router to call
export const appRouter = router({
  surveys: router({
    // list all surveys
    list: publicProcedure.query(list),
    // create survey in database
    create: publicProcedure.input(z.object(dbZodType)).mutation(create),
  }),
})

export type AppRouter = typeof appRouter
