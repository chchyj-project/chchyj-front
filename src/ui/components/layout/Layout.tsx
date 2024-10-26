import styled from '@emotion/styled';

import { PropsWithChildren } from 'react';
import FixedHeader from './Header.tsx';
import { Outlet } from 'react-router-dom';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Container>
      <FixedHeader />
      <Outlet />
      {children}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 100%;
  //padding: 0 15px;

  max-width: 440px;
  height: 100%;
  //max-height: 920px;
  background-color: #ffffff;
`;
