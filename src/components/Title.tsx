import React from 'react';
import styled from 'styled-components';

interface TitleProps {
  title: string;
  size: 'small' | 'mid' | 'large';
  required?: boolean;
}
interface TitleBoxProps {
  size: 'small' | 'mid' | 'large';
  required?: boolean;
}
const TitleBox = styled.div<TitleBoxProps>`
  ${(props) => {
    if (props.size === 'small') {
      return `
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #212121;
      `;
    } else if (props.size === 'mid') {
      return `
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #000;
      `;
    } else {
      return 'px';
    }
  }};
  ${(props) => {
    if (props.required) {
      return `
            &::after {
                content: "*";
                font-style: normal;
                font-weight: 500;
                font-size: 12px;
                color: #B11313;
            }
        `;
    }
  }}
`;
function Title({ title, size, required }: TitleProps) {
  return (
    <TitleBox size={size} required={required}>
      {title}
    </TitleBox>
  );
}

export default Title;
