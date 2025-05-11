import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer.tsx';
import AuthService from '../api/AuthService.ts';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axiosConfig.ts';
import inkMarker from '../images/ink_marker.png';
import Heart from '../images/heart3.png';
import {
  Container,
  Header,
  BackButton,
  ProfileSection,
  ProfileHeader,
  Title,
  Subtitle,
  StatsContainer,
  StatItem,
  StatNumber,
  HeartNumber,
  Img,
  HeartNumberBox,
  StatLabel,
  MenuList,
  MenuItem,
  TitleWrapper,
  EditButton,
  MenuItemContent,
  MenuText,
  Logo,
  Secession,
  New,
  MarkerIcon,
} from './Profile.styles.ts';
import { Title as TitleLogo } from '../style/commonStyle.ts';

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
        <TitleLogo>칭찬요정</TitleLogo>
      </Header>

      <ProfileSection>
        <ProfileHeader>
          <TitleWrapper>
            <Title>{myProfileInfo.nickname || '사용자'}</Title>
            <EditButton>
              <MarkerIcon src={inkMarker} alt="닉네임변경" />
              닉네임변경
            </EditButton>
          </TitleWrapper>
        </ProfileHeader>
        {/* //TODO: 칭찬요정이 되신지 몇일이 되었어요! */}
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
          <MenuItem onClick={logout}>
            <MenuText>로그아웃</MenuText>
          </MenuItem>
        </MenuList>
        <Secession>회원 탈퇴하기</Secession>
      </ProfileSection>
      <Footer />
    </Container>
  );
}
