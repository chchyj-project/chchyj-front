import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Common from '../style/Common.ts';
import FilledHeart from '../images/filled_heart.svg';
import { ACCESS_TOKEN_NAME } from '../constant/constant.ts';
import TopLogo from '../images/topLogo.png';
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
    padding: 24px;
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
  color: #6B90FF;
  font-weight: 700;
  font-size: 15px;
  // line-height: 17px;
  cursor: pointer;
`;
const Img = styled.img`
width:24px;
height:24px;
margin-left: 4px;
`
const New = styled.div`
width:12px;
height:12px;
color:#fff;
background-color: ${styleToken.color.primary};
border-radius: 8px;
font-size: 7px;
text-align:center;
line-height: 10.5px;
border: 1px solid #fff;
margin-left: -10px;
`
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
          <Title><img src={TopLogo} alt='logo'/></Title>
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
              {/* <div style={{ padding: '0 4px', marginRight: '4px' }}>
               <img src={FilledHeart} alt={'filled_heart'} />
              </div> */}
              <Nickname>{nickname}</Nickname>
              <Img src={Person} alt='user icon' />
              <New>N</New>
              <Img src={Help} alt='help icon' />
            </NicknameWrapper>
            
          )}
        </HeaderContainer>
      </FixedHeaderWrapper>
    </PageContainer>
  );
};

export default FixedHeader;
