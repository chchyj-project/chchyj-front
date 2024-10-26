import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import styleToken from '../../styles/styleToken.ts';

export default function Body({ children }: PropsWithChildren) {
  console.log('Body', children);
  return <Container>{children}</Container>;
}

const Container = styled.div`
  //height: 100px;
  flex: 1 0 auto;
  display: flex;
  padding-top: 60px;
  flex-direction: column;
  background-color: ${styleToken.color.background};
`;
