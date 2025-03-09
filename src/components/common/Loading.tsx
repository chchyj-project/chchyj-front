// components/Loading.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

type LoadingContainerProps = {
  fullScreen?: boolean;
};

type SpinnerProps = {
  size?: string;
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div<LoadingContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.fullScreen ? '100vh' : '100%')};
  width: 100%;
`;

const Spinner = styled.div<SpinnerProps>`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: ${(props) => props.size || '40px'};
  height: ${(props) => props.size || '40px'};
  animation: ${spin} 1s linear infinite;
`;

type LoadingProps = {
  fullScreen?: boolean;
  size?: string;
};

const Loading = ({ fullScreen = false, size }: LoadingProps) => {
  return (
    <LoadingContainer fullScreen={fullScreen}>
      <Spinner size={size} />
    </LoadingContainer>
  );
};

export default Loading;
