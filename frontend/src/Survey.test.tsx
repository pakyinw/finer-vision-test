import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Survey from './Survey'
import { PropsWithChildren } from 'react'

import { trpc } from './utils/trpc'

jest.mock('react-notifications-component', () =>{
  return{
    ReactNotifications: ({children}:PropsWithChildren<unknown>) =>{
      return (<div>{children}</div>)
    },
    Store: {
      addNotification: jest.fn(),
    }
  }
})

jest.mock('./utils/trpc', () =>{
  return{
    trpc: {
      surveys:{
        create:{
          useMutation: ()=>{
            return{
              isLoading: jest.fn(),
              mutate: jest.fn(),
            }
          }
        }
      }
    }
  }
})

describe('Survey',()=>{
  it('Step1', () => {
    const { getByText } = render(<Survey/>)
    expect(getByText('Email Address')).toBeInTheDocument();
  })
  it('Step2', () => {
    const { getByText } = render(<Survey/>)
    expect(getByText('Gender')).toBeInTheDocument();
  })
  it('Step3', () => {
    const { getByText } = render(<Survey/>)
    expect(getByText('Comments')).toBeInTheDocument();
  })
})
