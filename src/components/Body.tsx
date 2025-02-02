import styled from 'styled-components';
import FixedHeader from './FixedHeader.tsx';
import React from 'react';
import styleToken from '../style/styleToken.ts';

export default function Body({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <Container color={color}>
      <FixedHeader bgColor={''} />
      {children}
    </Container>
  );
}

interface BodyContainerProps {
  color?: string;
}

const Container = styled.div<BodyContainerProps>`
  min-height: 100vh;
  flex: 1 0 auto;
  display: flex;
  padding-top: 60px;
  flex-direction: column;
  background-color: ${(props) => props.color || styleToken.color.background};
`;
