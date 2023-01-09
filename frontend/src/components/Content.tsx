import styled from 'styled-components'

interface Props {
  show?: boolean;
  alignItem?: string;
  wrap?: string
}

const Content = styled.div<Props>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  align-items:  ${(props) => props.alignItem};
  justify-content: left;
  flex-direction: row;
  flex-wrap: ${(props) => props.wrap};

  width: 100%;
  margin-top: -8px;
  padding-top: 20px;
  padding-bottom: 10px;

  border-radius: 0px 0px 10px 10px;
  background-color: #DEDEDE;
  positiion: relative;
  z-index: 0;
`

Content.defaultProps = {
  show: false,
  alignItem: 'center',
  wrap: 'wrap'
}

export default Content
