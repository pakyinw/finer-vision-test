import styled from 'styled-components'

interface Props {
  id: string
  title: string
  control: React.RefObject<HTMLInputElement>
}

const Container = styled.div`
  width: 210px;
  text-align: left;
  margin-left: 10px;
  margin-top: 10px;
`
const Input = styled.input`
  margin-top: 5px;
  width: 98%;
  height: 40px;
  border: 0px;
  border-radius: 10px;
`

function Email({ id, title, control }: Props) {
  return (
    <Container>
      <label htmlFor={id}>{title}</label>
      <br />
      <Input 
        type="email" 
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        id={id}
        name={id}
        ref={control}
        required />
    </Container>
  )
}

export default Email
