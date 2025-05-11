import styled from 'styled-components';
import React, { useState } from 'react';

interface StyledButtonProps {
  $isActive: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  width: 10px;
  height: 10px;
  min-width: 10px;
  min-height: 10px;
  flex-shrink: 0;
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

interface CircleButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isActive?: boolean;
}

const CircleButton = ({ onClick, isActive, ...props }: CircleButtonProps) => {
  // When isActive is provided externally, use it instead of internal state
  const activeState = isActive !== undefined ? isActive : false;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <StyledButton onClick={handleClick} $isActive={activeState} {...props}>
      <InnerCircle $isActive={activeState} />
    </StyledButton>
  );
};

export default CircleButton;
