// MyPraiseCollectionPage.tsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, MessageCircle, Edit3 } from 'lucide-react';
import PraiseFairy from '../components/PraiseFairy.tsx';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {
  Container,
  Header,
  BackButton,
  BannerSection,
  BannerText,
  BannerTitle,
  BannerDescription,
  BannerImage,
  TabMenu,
  Tab,
  PraiseListSection,
  PraiseItem,
  PraiseHeader,
  Nickname,
  DateInfo,
  PraiseContent,
  Pagination,
  PageButton,
} from './MyPraiseCollectionPage.styles.ts';
import { Title } from '../style/commonStyle';
// 타입 정의
interface PraiseItem {
  id: number;
  nickname: string;
  content: string;
  date: string;
}

// 메인 컴포넌트
const MyPraiseCollectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
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
        <BackButton onClick={handleBack}>
          <ChevronLeft size={24} />
        </BackButton>
        <Title>내 칭찬 모아보기</Title>
      </Header>

      <BannerSection>
        <BannerText>
          <BannerTitle>나의 칭찬 활동을 모아봐요!</BannerTitle>
          <BannerDescription>
            내가 작성한 칭찬글과 댓글을 한눈에 확인할 수 있어요.
          </BannerDescription>
        </BannerText>
        <BannerImage>
          <PraiseFairy />
        </BannerImage>
      </BannerSection>

      <TabMenu>
        <Tab active={activeTab === 'posts'} onClick={() => updateTab('posts')}>
          <Edit3 size={18} />내 칭찬글
        </Tab>
        <Tab
          active={activeTab === 'comments'}
          onClick={() => updateTab('comments')}
        >
          <MessageCircle size={18} />내 댓글
        </Tab>
      </TabMenu>

      <PraiseListSection>
        {praiseItems.length > 0 && (
          <>
            {praiseItems.map((item) => (
              <PraiseItem key={item.id}>
                <PraiseHeader>
                  <Nickname>{item.nickname}</Nickname>
                  <DateInfo>{item.date}</DateInfo>
                </PraiseHeader>
                <PraiseContent>{item.content}</PraiseContent>
              </PraiseItem>
            ))}

            <Pagination>
              <PageButton disabled={currentPage === 1}>&lt;</PageButton>
              <PageButton active={true}>1</PageButton>
              <PageButton>2</PageButton>
              <PageButton>3</PageButton>
              <PageButton>&gt;</PageButton>
            </Pagination>
          </>
        )}
      </PraiseListSection>
    </Container>
  );
};

export default MyPraiseCollectionPage;
