import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Common from '../style/Common.ts';
import FilledHeart from '../images/filled_heart.svg';
import { ACCESS_TOKEN_NAME } from '../constant/constant.ts';
import Person from '../images/person.png';
import styleToken from '../style/styleToken.ts';
import Help from '../images/help.png';

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
  display: flex;
  justify-content: center;
  width: 100%;
`;

const HeaderContainer = styled.header<ContainerProps>`
  max-width: 390px;
  width: 100%;
  height: 60px;
  margin: 0 auto;
  color: #111111;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  padding: 0 24px;
  box-sizing: border-box;
  background-color: ${(props) => props.$bgColor || '#ffffff'};
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  color: ${Common.colors.mainBlue};
  font-family: 'Jalnan', sans-serif;
  letter-spacing: 1px;
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
  color: #6b90ff;
  font-weight: 700;
  font-size: 15px;
  // line-height: 17px;
  cursor: pointer;
`;
const Img = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 4px;
`;
const New = styled.div`
  width: 12px;
  height: 12px;
  color: #fff;
  background-color: ${styleToken.color.primary};
  border-radius: 8px;
  font-size: 7px;
  text-align: center;
  line-height: 10.5px;
  border: 1px solid #fff;
  margin-left: -10px;
`;
interface FixedHeaderProps {
  bgColor: string;
}

const FixedHeader = ({ bgColor }: FixedHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem(ACCESS_TOKEN_NAME);
  const nickname = token ? localStorage.getItem('nickname') : '';

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
            <NicknameWrapper onClick={() => navigate('/profile')}>
              <Nickname>{nickname}</Nickname>
              <Img src={Person} alt="user icon" />
              {/*👉 프로필 N표시 */}
              <New>N</New>
              {/*👉 help 아이콘콘 */}
              <Img src={Help} alt="help icon" />
            </NicknameWrapper>
          )}
        </HeaderContainer>
      </FixedHeaderWrapper>
    </PageContainer>
  );
};

export default FixedHeader;
