import styled from '@emotion/styled';

import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Container>
      <Outlet />
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 가로 중앙 정렬 */
  justify-content: center; /* 세로 중앙 정렬 */
  width: 100%;
  max-width: 440px;
  min-height: 100vh; /* 화면 전체 높이를 채우도록 설정 */
  background-color: #ffffff;
  box-sizing: border-box;
  margin: 0 auto; /* 가로 중앙 정렬을 위해 auto 마진 사용 */
`;
