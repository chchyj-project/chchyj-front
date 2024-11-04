import Layout from './Layout.tsx';
import styled from 'styled-components';
import { PropsWithChildren } from 'react';

export default function Page({ children }: PropsWithChildren) {
  return (
    <Container>
      <Layout>{children}</Layout>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #e9e9e9;
`;
