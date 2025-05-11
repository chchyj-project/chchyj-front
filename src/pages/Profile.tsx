import styled from 'styled-components';
import {
  ChevronLeft,
  Bell,
  Folder,
  SmileIcon,
  Clock,
  LogOut,
  Edit2,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer.tsx';
import AuthService from '../api/AuthService.ts';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axiosConfig.ts';
import TopLogo from '../images/topLogo.png';
import Heart from '../images/heart3.png';
import styleToken from '../style/styleToken.ts';

const Container = styled.div`
  max-width: 390px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #e2e5e9;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

const ProfileSection = styled.div`
  padding: 24px;
  flex: 1;
  background-color: #f5f5f5;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: #303030;
`;

const Subtitle = styled.p`
  color: #303030;
  font-size: 19px;
  margin-bottom: 28px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
  height: 80px;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${styleToken.color.primary};
`;
const HeartNumber = styled.div`
  width: 18px;
  height: 18px;
  color: #fff;
  font-size: 12px;
  border-radius: 9px;
  text-align: center;
  line-height: 1.2;
  border: 1px solid #fff;
  margin-left: -12px;
  margin-top: -4px;
  background: ${styleToken.color.primary};
`;
const Img = styled.img`
  margin-top: -4px;
`;
const HeartNumberBox = styled.div`
  display: flex;
`;
const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

const MenuList = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 8px;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  width: 340px;
  height: 51px;
  border: none;
  background: none;
  font-size: 17px;
  color: #303030;
  cursor: pointer;
  text-align: left;
  padding: 10px;
  transition: background-color 0.2s;
  color: #303030;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: #f8f9fa;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const EditButton = styled.button`
  width: 82px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #666;
  font-size: 11px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  svg {
    margin-right: 2px;
  }
  &:hover {
    background: #f5f5f5;
  }
`;

const MenuItemContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const MenuText = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  font-weight: 500;
`;

// const NewCommentBadge = styled.span`
//   background-color: #e8f4f9;
//   color: #69b4d6;
//   padding: 6px 10px;
//   border-radius: 20px;
//   font-size: 13px;
//   font-weight: 600;
//   white-space: nowrap;
//   margin-left: auto;
//   display: flex;
//   align-items: center;

// `;

const HeartIcon = styled.span`
  font-size: 20px;
  margin-right: 4px;
  color: #87ceeb;
`;
const Logo = styled.div`
  img {
    width: 80px;
    height: 30px;
  }
`;
const Secession = styled.p`
  text-align: right;
  font-size: 17px;
  color: #8a8a8a;
  padding-right: 8px;
`;
const New = styled.div`
  width: 22px;
  height: 22px;
  color: #fff;
  background-color: ${styleToken.color.primary};
  border-radius: 12px;
  font-size: 12px;
  text-align: center;
  line-height: 1.5;
  border: 1px solid #fff;
  margin-right: -12px;
`;
type ProfileProps = {
  heartConsumeCount: number;
  heartRemainCount: number;
  heartTotalCount: number;
  nickname: string;
  userId: number;
};

export default function Profile() {
  const navigate = useNavigate();
  const [myProfileInfo, setMyProfileInfo] = useState<ProfileProps>({
    heartConsumeCount: 0,
    heartRemainCount: 0,
    heartTotalCount: 0,
    nickname: '',
    userId: 0,
  });

  useEffect(() => {
    const fetchMyHeartCount = async () => {
      const { data } = await axiosInstance.get(`/profiles`);
      console.log('data>>', data);
      setMyProfileInfo({ ...data });
    };
    fetchMyHeartCount();
  }, []);

  const logout = () => {
    AuthService.logout();
    navigate('/home');
  };
  const [danger, setDanger] = useState(true);
  return (
    <Container>
      <Header>
        <BackButton
          onClick={() =>
            navigate(`/home?userSocialId=${localStorage.getItem('nickname')}`)
          }
        >
          <ChevronLeft size={24} />
        </BackButton>
        <Logo>
          <img src={TopLogo} alt="logo" />
        </Logo>
      </Header>

      <ProfileSection>
        <ProfileHeader>
          <TitleWrapper>
            <Title>{myProfileInfo.nickname || '사용자'}</Title>
            <EditButton>
              <Edit2 size={14} />
              닉네임변경
            </EditButton>
          </TitleWrapper>
        </ProfileHeader>
        <Subtitle>
          칭찬요정이 되신지 {myProfileInfo.userId ? '1일' : '0일'}이 되었어요!
        </Subtitle>

        <StatsContainer>
          <StatItem>
            <StatNumber>{myProfileInfo.heartTotalCount ?? 0}</StatNumber>
            <StatLabel>총 하트</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{myProfileInfo.heartConsumeCount ?? 0}</StatNumber>
            <StatLabel>사용한 하트</StatLabel>
          </StatItem>
          <StatItem>
            <HeartNumberBox>
              <Img src={Heart} alt="heart icon" />
              <HeartNumber>{myProfileInfo.heartRemainCount ?? 0}</HeartNumber>
            </HeartNumberBox>
            <StatLabel>남은 하트</StatLabel>
          </StatItem>
        </StatsContainer>

        <MenuList>
          <MenuItem onClick={() => navigate('/my-collection?tab=posts')}>
            <MenuItemContent>
              <MenuText>내 칭찬글 모아보기</MenuText>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              ></div>
            </MenuItemContent>
          </MenuItem>
        </MenuList>
        <MenuList>
          <MenuItem onClick={() => navigate('/my-collection?tab=comments')}>
            <MenuItemContent>
              <MenuText>내가 쓴 칭찬댓글</MenuText>
            </MenuItemContent>
          </MenuItem>
        </MenuList>
        <MenuList>
          <MenuItem>
            <MenuItemContent>
              <MenuText>내 글에 칭찬 요정이 찾아왔어요!</MenuText>
              <New>N</New>
            </MenuItemContent>
          </MenuItem>
        </MenuList>
        <MenuList style={{ marginTop: '24px' }}>
          <MenuItem onClick={logout}>로그아웃</MenuItem>
        </MenuList>
        <Secession>회원 탈퇴하기</Secession>
      </ProfileSection>
      <Footer />
    </Container>
  );
}
