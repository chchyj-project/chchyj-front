import styled from 'styled-components';
import Common from '../style/Common';

const Div = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${Common.colors.gray};
`;
function Division() {
  return <Div className="division"></Div>;
}

export default Division;
