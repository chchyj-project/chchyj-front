import styled from 'styled-components';
import Common from '../../style/Common';

interface ButtonProps {
  disabled: boolean;
  onClick: () => void;
  text: string;
  styles?: any;
  buttonColor:
    | 'red'
    | 'skyblue'
    | 'beige100'
    | 'beige200'
    | 'green'
    | 'yellow'
    | 'white'
    | 'black';
  textColor: string;
  img: any;
}
const Layout = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  min-width: 314px;
  height: 50px;
  font-size: 12px;
  background-color: ${Common.colors.red};
  border-radius: 50px;
  color: #fff;
`;
function Button({
  disabled,
  onClick,
  text,
  img,
  styles,
  buttonColor,
  textColor,
}: ButtonProps) {
  return (
    <Layout
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: `${Common.colors[buttonColor]}`,
        color: `${textColor}`,
        ...styles,
      }}
    >
      {img}
      {text}
    </Layout>
  );
}

export default Button;
