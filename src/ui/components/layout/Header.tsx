import { useState } from 'react';
import styled from '@emotion/styled';

// 상위 컨테이너 추가
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const FixedHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #ffffff;
`;

const HeaderContainer = styled.header`
  width: 100%;
  max-width: 440px;
  height: 60px;
  color: #111111;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  box-sizing: border-box;
  margin-left: 15px;
  margin-right: 15px;
  background-color: #ffffff;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export default function FixedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <PageContainer>
      <FixedHeaderWrapper>
        <HeaderContainer>
          <Title>칭찬요정</Title>
          <MenuButton
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            로그인
          </MenuButton>
        </HeaderContainer>
      </FixedHeaderWrapper>
    </PageContainer>
  );
}
