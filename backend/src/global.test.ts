import { survey, initDatabase } from './global'

jest.mock('sequelize', () => {
  class mockSequelize {
    define() {
      return {
        create: jest.fn(),
      }
    }
    sync() {}
  }
  return {
    Sequelize: mockSequelize,
    DataTypes: {
      STRING: 1,
      TEXT: 2,
    },
  }
})

describe('Test global.ts', () => {
  it('initDatabase', async () => {
    await initDatabase()
    expect(survey.create).toHaveBeenCalledTimes(2)
  })
})
