import styled from 'styled-components'

interface Props {
  id: string
  title: string
  dayControl: React.RefObject<HTMLInputElement>
  monthControl: React.RefObject<HTMLInputElement>
  yearControl: React.RefObject<HTMLInputElement>
}

const Container = styled.div`
  text-align: left;
  margin-left: 10px;
  margin-top: 10px;
`

const Birth = styled.input`
  width: 45px;
  margin-top: 5px;
  margin-right: 5px;
  height: 40px;
  border: 0px;
  border-radius: 10px;
`

function TextField({ dayControl, monthControl, yearControl }: Props) {
  return (
    <Container>
      Birthday
      <br />
      <Birth type="text" id="day" name="day" ref={dayControl} required placeholder="DD"/>
      <Birth type="text" id="month" name="month" ref={monthControl} required pattern="^(0?[1-9]|1[012])$" placeholder="MM"/>
      <Birth type="text" id="year" name="year" ref={yearControl} required pattern="(?:19|20)\d\d" placeholder="YYYY"/>
    </Container>
  )
}

export default TextField
