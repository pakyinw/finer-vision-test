import { PropsWithChildren } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  flex-direction: row;
  width: 100%;
  height: 60px;
  color: white;
  border-radius: 10px;
  background: rgb(254,197,0);
  background: linear-gradient(180deg, rgba(254,197,0,1) 0%, rgba(243,179,7,1) 35%, rgba(238,163,14,1) 100%);
  position: relative;
  z-index: 1;
`

const Title = styled.p`
  margin: 0px 15px;
`

interface Props {
  onClick: () => void
}

function Bar({ children, onClick }: PropsWithChildren<Props>) {
  return (
    <Container onClick={onClick}>
      <Title>{children}</Title>
    </Container>
  )
}

export default Bar
