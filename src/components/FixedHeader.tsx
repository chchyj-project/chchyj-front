import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Common from '../style/Common.ts';
import FilledHeart from '../images/filled_heart.svg';
interface ContainerProps {
  $bgColor: string;
}

// 상위 컨테이너 추가
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-sizing: border-box;
`;

const FixedHeaderWrapper = styled.div`
  z-index: 150;
  position: fixed;
  left: 0;
  right: 0;
  background-color: ${Common.colors.gray};
`;

const HeaderContainer = styled.header<ContainerProps>`
  max-width: 768px;
  height: 60px;
  margin: 0 auto;

  color: #111111;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  padding: 0 15px;
  box-sizing: border-box;
  background-color: ${(props) => props.$bgColor || '#ffffff'};
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

const NicknameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Nickname = styled.button`
  color: #84d1fd;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  cursor: pointer;
`;

const Alarm = styled.div`
  background: #60c3fb;
  border-radius: 16px;
  width: 18px;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 600;
  margin-left: 8px;
`;

interface FixedHeaderProps {
  bgColor: string;
}

const FixedHeader = ({ bgColor }: FixedHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const nickname = localStorage.getItem('nickname');

  console.log('bgColor', bgColor);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    navigate('/login');
  };

  return (
    <PageContainer>
      <FixedHeaderWrapper>
        <HeaderContainer $bgColor={bgColor}>
          <Title>칭찬요정</Title>
          {!nickname ? (
            <MenuButton
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              회원가입 / 로그인
            </MenuButton>
          ) : (
            <NicknameWrapper>
              <div style={{ padding: '0 4px' }}>
                <img src={FilledHeart} alt={'filled_heart'} />
              </div>
              <Nickname>{nickname}</Nickname>
              <Alarm>
                <span style={{ display: 'block' }}>17</span>
              </Alarm>
            </NicknameWrapper>
          )}
        </HeaderContainer>
      </FixedHeaderWrapper>
    </PageContainer>
  );
};

export default FixedHeader;
