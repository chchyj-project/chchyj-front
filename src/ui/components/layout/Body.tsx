import styled from '@emotion/styled';
import styleToken from '../../styles/styleToken.ts';
import FixedHeader from './Header.tsx';
import React from 'react';

export default function Body({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <Container color={color}>
      <FixedHeader />
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
