import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'
import Survey from './Survey'
import { PropsWithChildren } from 'react'
import { QueryClient } from '@tanstack/react-query'


jest.mock('./Survey', () =>
  jest.fn(() => {
    return (<div>Survey</div>)
  })  
)

jest.mock('./utils/trpc', () =>{
  return{
    trpc :{
      Provider: ({children}:PropsWithChildren<unknown>) =>{
        return (<div>{children}</div>)
      },
      createClient: ()=>{}
    }
  
  }
}
)

jest.mock('@tanstack/react-query', () =>{
  class QueryClient{
      
  }
  return{
    QueryClientProvider: ({children}:PropsWithChildren<unknown>) =>{
      return (<div>{children}</div>)
    },
    QueryClient: QueryClient
  }
}
)

describe('App',()=>{
  it('Test Survey', () => {
    const {getByText} =render(<div><App /></div>)
    expect(getByText('Survey')).toBeInTheDocument()
  })
})
