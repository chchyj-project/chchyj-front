import styled from 'styled-components';
import React, { useState } from 'react';

interface StyledButtonProps {
  $isActive: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.$isActive ? '#2196F3' : '#888888')};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.$isActive ? '#1976D2' : '#888888')};
  }

  &:active {
    background-color: ${(props) => (props.$isActive ? '#1565C0' : '#888888')};
  }
`;

interface InnerCircleProps {
  $isActive: boolean;
}

const InnerCircle = styled.div<InnerCircleProps>`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${(props) => (props.$isActive ? 'white' : '#ffffff')};
  transition: background-color 0.2s ease-in-out;
`;

const CircleButton = ({
  onClick,
  ...props
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>, isActive: boolean) => void;
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsActive(!isActive);
    if (onClick) {
      onClick(e, !isActive);
    }
  };

  return (
    <StyledButton onClick={handleClick} $isActive={isActive} {...props}>
      <InnerCircle $isActive={isActive} />
    </StyledButton>
  );
};

export default CircleButton;
