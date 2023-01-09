import styled from 'styled-components'

interface Props {
  id: string
  title: string
  control: React.RefObject<HTMLInputElement>
  pattern?: string
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

function TextField({ id, title, control, pattern }: Props) {
  return (
    <Container>
      <label htmlFor={id}>{title}</label>
      <br />
      <Input type="text" id={id} ref={control} required name={id} pattern={pattern}/>
    </Container>
  )
}

export default TextField
