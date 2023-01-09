import { main, shutDown } from './main'
import express from 'express'
import cors from 'cors'
import * as trpcExpress from '@trpc/server/adapters/express'
import { sequelize, initDatabase } from './global'

import jestConfig from '../jest.config'

jest.mock('express', () =>
  jest.fn(() => {
    return {
      use: (arg1) => {
        if (typeof arg1 === 'function') {
          arg1(
            {
              method: '',
              path: '',
              body: '',
            },
            null,
            () => {}
          )
        }
      },
      listen: () => {},
    }
  })
)

jest.mock('cors', () =>
  jest.fn(() => {
    return {}
  })
)

jest.mock('@trpc/server/adapters/express', () => {
  return {
    createExpressMiddleware: jest.fn(),
  }
})

jest.mock('./router', () => {
  return {
    appRouter: '',
  }
})

jest.mock('./global', () => {
  return {
    port: 2021,
    sequelize: {
      close: jest.fn(),
    },
    initDatabase: jest.fn().mockResolvedValue(43),
  }
})

describe('Test main.ts', () => {
  it('main', async () => {
    await main()
    expect(initDatabase()).resolves.toBe(43)
    expect(express).toHaveBeenCalledTimes(1)
    expect(cors).toHaveBeenCalledTimes(1)
    expect(trpcExpress.createExpressMiddleware).toHaveBeenCalledTimes(1)
  })
  it('shutdown', () => {
    shutDown()
    expect(sequelize.close).toHaveBeenCalledTimes(1)
  })
})
