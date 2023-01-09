import styled from 'styled-components'

interface Props {
  id: string
  title: string
  control: React.RefObject<HTMLTextAreaElement>
}

const Container = styled.div`
  text-align: left;
  margin: 0px 10px;  
  margin-top: 10px;
  flex-shrink: 10;
  flex-basis: 390px;
`

const Comment = styled.textarea`
  width: 100%;
  height: 150px;
  margin-top: 7px;
  border: 0px;
  border-radius: 10px;
  box-sizing:border-box;
`

function TextArea({ id, title, control }: Props) {
  return (
    <Container>
      <label htmlFor={id}>{title}</label>
      <br/>
      <Comment id={id} ref={control} required />
    </Container>
  )
}

export default TextArea
