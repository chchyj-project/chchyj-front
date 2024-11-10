import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Common from '../style/Common.ts';
interface ContainerProps {
  bgColor: string;
}

// // 상위 컨테이너 추가
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: white;
  //width: 100vw;
  //overflow-x: hidden;
  box-sizing: border-box;
`;

const FixedHeaderWrapper = styled.div`
  z-index: 150;
  //top: 60px;
  position: fixed;
  //width: 768px; /* 최대 너비 제한 */

  left: 0;
  right: 0;
  background-color: ${Common.colors.gray};
  //position: relative;
`;

const HeaderContainer = styled.header<ContainerProps>`
  max-width: 768px;
  height: 60px;
  margin: 0 auto;

  color: #111111;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 15px;
  box-sizing: border-box;
  background-color: ${(props) => props.bgColor || '#ffffff'};
  @media (max-width: 768px) {
    padding: 50px 10px 30px 10px;
  }
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

const FixedHeader = ({ bgColor }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  console.log('bgColor', bgColor);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    navigate('/login');
  };

  return (
    <PageContainer>
      <FixedHeaderWrapper>
        <HeaderContainer bgColor={bgColor}>
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
};

export default FixedHeader;
