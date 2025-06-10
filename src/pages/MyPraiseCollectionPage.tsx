// MyPraiseCollectionPage.tsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Container,
  Header,
  BackButton,
  TabMenu,
  Tab,
  StyledPraiseItem,
  PraiseHeader,
  Nickname,
  DateInfo,
  PraiseContent,
  PraiseListSection,
  PraiseItemWrapper,
  PraiseMeta,
  CommentCount,
  PraiseBubble,
  Avatar,
} from './MyPraiseCollectionPage.styles.ts';
import { Title as TitleLogo } from '../style/commonStyle.ts';
import Footer from '../components/Footer.tsx';
import { MessageCircle } from 'lucide-react';

// 타입 정의
interface PraiseItem {
  id: number;
  nickname: string;
  content: string;
  date: string;
  commentCount?: number;
  avatarUrl?: string;
}

// 메인 컴포넌트
const MyPraiseCollectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [praiseItems, setPraiseItems] = useState<PraiseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab') || 'posts';
  const [activeTab, setActiveTab] = useState<'posts' | 'comments'>(
    tabFromUrl === 'comments' ? 'comments' : 'posts',
  );

  useEffect(() => {
    const newTab = searchParams.get('tab');
    if (newTab === 'comments' && activeTab !== 'comments') {
      setActiveTab('comments');
    } else if ((newTab === 'posts' || !newTab) && activeTab !== 'posts') {
      setActiveTab('posts');
    }
  }, [searchParams, activeTab]);
  // 데이터 로딩 예시 (실제 구현 시 API 호출로 대체)
  useEffect(() => {
    // 예시 데이터
    const dummyData: PraiseItem[] =
      activeTab === 'posts'
        ? [
            {
              id: 1,
              nickname: '행복한하루',
              content:
                '오늘 하루, 멋진 일이 있으셨나요? 너무 착한 일이라도 좋습니다.',
              date: '2024.11.24',
            },
            {
              id: 2,
              nickname: '칭찬요정',
              content:
                '맛집 탐방하신 글 정말 좋았어요! 덕분에 저도 방문해보려고요~',
              date: '2024.11.23',
            },
            {
              id: 3,
              nickname: '따뜻한마음',
              content: '오늘은 글 목록 api를 만들었어요~',
              date: '2024.11.22',
            },
          ]
        : [
            {
              id: 1,
              nickname: '나',
              content:
                '정말 감동적인 이야기네요. 당신의 따뜻한 마음이 느껴집니다.',
              date: '2024.11.24',
            },
            {
              id: 2,
              nickname: '나',
              content: '오늘은 글 목록 api를 만들었어요~',
              date: '2024.11.23',
            },
            {
              id: 3,
              nickname: '나',
              content: '멋진 생각이에요! 저도 한번 시도해볼게요.',
              date: '2024.11.22',
            },
          ];

    // 데이터 로딩 시뮬레이션
    setLoading(true);
    setTimeout(() => {
      setPraiseItems(dummyData);
      setLoading(false);
    }, 500);
  }, [activeTab]);

  const handleBack = () => {
    navigate('/profile');
  };

  const updateTab = (tab: 'posts' | 'comments') => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

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

      <TabMenu>
        <Tab active={activeTab === 'posts'} onClick={() => updateTab('posts')}>
          내 칭찬글 모아보기
        </Tab>
        <Tab
          active={activeTab === 'comments'}
          onClick={() => updateTab('comments')}
        >
          내가 쓴 칭찬 댓글
        </Tab>
      </TabMenu>
      <PraiseListSection>
        {praiseItems.map((item) => (
          <PraiseItemWrapper key={item.id}>
            {/* 메타 정보: 날짜와 댓글 수 */}
            <PraiseMeta>
              <DateInfo>{item.date}</DateInfo>
              <CommentCount>
                <MessageCircle size={16} />
                <span>칭찬댓글 {item.commentCount ?? 0}개</span>
              </CommentCount>
            </PraiseMeta>

            {/* 말풍선 스타일 박스 */}
            <PraiseBubble>
              <PraiseContent>{item.content}</PraiseContent>
              {item.avatarUrl && <Avatar src={item.avatarUrl} alt="profile" />}
            </PraiseBubble>
          </PraiseItemWrapper>
        ))}
      </PraiseListSection>

      <Footer />
    </Container>
  );
};

export default MyPraiseCollectionPage;
