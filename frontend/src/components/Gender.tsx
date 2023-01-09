import styled from 'styled-components'

interface Props {
  id: string
  title: string
  control: React.RefObject<HTMLSelectElement>
}

const Container = styled.div`
  text-align: left;
  margin-left: 10px;
  margin-top: 10px;
`

const Select = styled.select`
  margin-top: 5px;
  margin-right: 10px;
  height: 40px;
  width: 150px;
  border: 0px;
  border-radius: 10px;
  padding: 5px;
  font-size: 15px;
`

const Option = styled.option`
  height: 40px;
  padding: 5px;
  font-size: 15px;
`

function TextField({ id, title, control }: Props) {
  return (
    <Container>
      <label htmlFor={id}>{title}</label>
      <br />
      <Select id={id} name={id} ref={control} required>
        <Option value=''>Select Gender</Option>
        <Option value='male'>Male</Option>
        <Option value='female'>Female</Option>
        <Option value='other'>Other</Option>
      </Select>
    </Container>
  )
}

export default TextField
