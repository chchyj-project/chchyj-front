import styled from 'styled-components';
import {
  ChevronLeft,
  Bell,
  Folder,
  SmileIcon,
  Clock,
  LogOut,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer.tsx';

const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
  background: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ProfileSection = styled.div`
  padding: 20px;
  flex: 1; // 나머지 공간을 차지하도록
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

const MenuList = styled.div`
  padding: 20px;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px;
  border: none;
  background: none;
  font-size: 16px;
  color: #333;
  cursor: pointer;

  &:hover {
    background: #f8f9fa;
  }
`;

const MenuIcon = styled.span`
  margin-right: 12px;
  display: flex;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
`;

const MenuItemContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const NewCommentBadge = styled.span`
  background-color: #e8f4f9;
  color: #87ceeb;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
`;

export default function Profile() {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </BackButton>
      </Header>

      <ProfileSection>
        <ProfileHeader>
          <TitleWrapper>
            <Title>꽃내랑</Title>
            <EditButton>편집하기</EditButton>
          </TitleWrapper>
        </ProfileHeader>
        <Subtitle>창천요정이 되신지 333일이 되었어요~</Subtitle>

        <StatsContainer>
          <StatItem>
            <StatNumber>10</StatNumber>
            <StatLabel>총 하트 개수</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>4</StatNumber>
            <StatLabel>사용한 하트</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>6</StatNumber>
            <StatLabel>남은 하트💙</StatLabel>
          </StatItem>
        </StatsContainer>

        <MenuList>
          <MenuItem>
            <MenuItemContent>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MenuIcon>
                  <Folder size={20} />
                </MenuIcon>
                내 칭찬글 모아보기
              </div>
              <NewCommentBadge>새로운 칭찬댓글 1개</NewCommentBadge>
            </MenuItemContent>
          </MenuItem>
          <MenuItem>
            <MenuItemContent>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MenuIcon>
                  <SmileIcon size={20} />
                </MenuIcon>
                내가 쓴 칭찬댓글 모아보기
              </div>
            </MenuItemContent>
          </MenuItem>
          <MenuItem>
            <MenuIcon>
              <Clock size={20} />
            </MenuIcon>
            로그아웃
          </MenuItem>
          <MenuItem>
            <MenuIcon>
              <LogOut size={20} />
            </MenuIcon>
            회원 탈퇴하기
          </MenuItem>
        </MenuList>
      </ProfileSection>
      <Footer />
    </Container>
  );
}
