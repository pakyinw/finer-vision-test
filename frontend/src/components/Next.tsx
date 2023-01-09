import { SyntheticEvent } from 'react'
import styled from 'styled-components'

interface ContainerProps {
  half? : boolean
}
const Container = styled.div<ContainerProps>`
  width: ${(props) => (props.half ? '40%' : '100%')};
  text-align: right;
  flex-grow: 5;
`

Container.defaultProps = {
  half: false
}

const BlueButton = styled.button`
  width: 130px;
  height: 30px;
  margin-top: 10px;
  margin-right: 10px;
  border: 0px;
  border-radius: 8px;
  box-shadow: 0px 0px 5px 0px #404bb5;
  background: rgb(64,75,181);
  background: linear-gradient(180deg, rgba(64,75,181,1) 0%, rgba(85,83,170,1) 35%, rgba(115,98,207,1) 100%);
  color: white;
  cursor: pointer;
  :disabled {
    cursor: not-allowed;
    background: grey;
  }
`

interface Props {
  half?: boolean
  disabled?: boolean
  onClick: (event:SyntheticEvent) => void
}

function Next({ half, disabled, onClick }: Props) {
  return (
    <Container half={half}>
      <BlueButton onClick={onClick} disabled={disabled}>Next &gt;</BlueButton>
    </Container>
  )
}

export default Next
