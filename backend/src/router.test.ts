import { initTRPC } from '@trpc/server'
import jestConfig from '../jest.config'
import { list, create, dbZodType } from './database'

import { trpc, appRouter } from './router'

jest.mock('./global',()=>{
  return{
    survey:{
      create: jest.fn().mockResolvedValue(43),
      findAll: jest.fn().mockImplementation(()=>{
        return [{
          dataValues: 2
        }]
      })
    }
  }
})

jest.mock('@trpc/server', () => {
  const createObj = {
    router: jest.fn().mockImplementation((e)=>{
      if(e?.surveys && typeof e.surveys === 'function'){
        e.surveys()
      }

      if(e?.list){
        e.list()
      }
      if(e?.create){
        e.create()
      }        
      return{
        surveys: jest.fn().mockImplementation(e=>{
          return 1;
        }),
        list: jest.fn().mockImplementation(e=>{

        }),
        create: jest.fn().mockImplementation(e=>{

        })

      }
    }),
    procedure: {
      query: jest.fn().mockImplementation((e)=>{
        if(typeof e === 'function'){
          e({input:{}})
        }
      }),
      input: jest.fn().mockImplementation(()=>{
        return{
          mutation: jest.fn().mockImplementation((e)=>{
            if(typeof e === 'function'){
              e({input:{}})
            }
          })
        }
      })
    }
  }
      
  return {
    initTRPC: {
      create: jest.fn().mockImplementation(()=>createObj),
    }
  }
})

describe('Test router.ts', () => {
  it('appRouter', async () => {
    trpc
  })
})
