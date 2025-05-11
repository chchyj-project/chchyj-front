import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../constant/constant.ts';
import Person from '../images/person.png';
import Help from '../images/help.png';
import {
  PageContainer,
  FixedHeaderWrapper,
  HeaderContainer,
  MenuButton,
  NicknameWrapper,
  Nickname,
  Img,
  New,
} from './FixedHeader.styles.ts';
import { Title } from '../style/commonStyle';
import { useHelpModalStore } from '../store/helpModalStore';

interface FixedHeaderProps {
  bgColor: string;
}

const FixedHeader = ({ bgColor }: FixedHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { openHelpModal } = useHelpModalStore();

  const token = localStorage.getItem(ACCESS_TOKEN_NAME);
  const nickname = token ? localStorage.getItem('nickname') : '';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    navigate('/login');
  };

  const handleHelpClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation(); // Prevent navigation to profile
    openHelpModal();
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
              {/*👉 help 아이콘 */}
              <Img
                src={Help}
                alt="help icon"
                onClick={handleHelpClick}
                style={{ cursor: 'pointer' }}
              />
            </NicknameWrapper>
          )}
        </HeaderContainer>
      </FixedHeaderWrapper>
    </PageContainer>
  );
};

export default FixedHeader;
