import React from "react";
import styled from "styled-components";
import Common from "../style/Common";

interface ButtonProps {
  disabled: boolean;
  onClick: () => void;
  text: string;
  styles?: any;
  buttonColor:
    | "red"
    | "beige100"
    | "beige200"
    | "green"
    | "yellow"
    | "white"
    | "black";
  textColor: string;
}
const Layout = styled.button`
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
      {text}
    </Layout>
  );
}

export default Button;
