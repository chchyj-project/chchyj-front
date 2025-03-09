// MyPraiseCollectionPage.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChevronLeft, MessageCircle, Edit3 } from 'lucide-react';
import PraiseFairy from '../components/PraiseFairy.tsx';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

// 타입 정의
interface PraiseItem {
  id: number;
  nickname: string;
  content: string;
  date: string;
}

// 전체 페이지 컨테이너
const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
  background: #f5f9ff;
  min-height: 100vh;
  padding-bottom: 80px;
`;

// 헤더 영역
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 16px;
  position: relative;
  border-bottom: 1px solid #e0e8f5;
  background-color: white;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: absolute;
  left: 16px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: #4a5568;
  margin: 0;
`;

// 배너 영역
const BannerSection = styled.section`
  background-color: #c9ebff;
  padding: 24px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BannerText = styled.div`
  flex: 1;
  padding-right: 20px;
`;

const BannerTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #111111;
  margin: 0 0 8px 0;
`;

const BannerDescription = styled.p`
  font-size: 14px;
  color: #4a5568;
  line-height: 1.5;
  margin: 0;
`;

const BannerImage = styled.div`
  width: 80px;
  height: 80px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

// 탭 메뉴
const TabMenu = styled.div`
  display: flex;
  background-color: white;
  margin-bottom: 16px;
  border-bottom: 1px solid #e0e8f5;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 16px;
  background: none;
  border: none;
  border-bottom: 3px solid
    ${(props) => (props.active ? '#60c3fb' : 'transparent')};
  color: ${(props) => (props.active ? '#60c3fb' : '#718096')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

// 칭찬 목록 영역
const PraiseListSection = styled.section`
  padding: 0 16px;
`;

const PraiseItem = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const PraiseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Nickname = styled.div`
  font-weight: bold;
  color: #4a5568;
  font-size: 16px;
`;

const DateInfo = styled.div`
  color: #a0aec0;
  font-size: 14px;
`;

const PraiseContent = styled.p`
  color: #4a5568;
  font-size: 15px;
  line-height: 1.5;
  margin: 0;
`;

// 페이지네이션 영역
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  gap: 8px;
`;

const PageButton = styled.button<{ active?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid ${(props) => (props.active ? '#60c3fb' : '#e0e8f5')};
  background-color: ${(props) => (props.active ? '#60c3fb' : 'white')};
  color: ${(props) => (props.active ? 'white' : '#4a5568')};
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// 빈 상태 컴포넌트
const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
`;

const EmptyImage = styled.div`
  width: 120px;
  height: 120px;
  margin-bottom: 16px;

  img {
    width: 100%;
  }
`;

const EmptyTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #4a5568;
  margin: 0 0 8px 0;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  color: #718096;
  line-height: 1.5;
  margin: 0 0 16px 0;
`;

const ActionButton = styled.button`
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3182ce;
  }
`;

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

  const renderEmptyState = () => (
    <EmptyState>
      <EmptyImage>
        <PraiseFairy />
      </EmptyImage>
      <EmptyTitle>
        {activeTab === 'posts'
          ? '작성한 칭찬글이 없어요'
          : '작성한 칭찬댓글이 없어요'}
      </EmptyTitle>
      <EmptyDescription>
        {activeTab === 'posts'
          ? '당신의 첫 번째 칭찬글을 작성해보세요!'
          : '다른 사람의 칭찬글에 댓글을 달아보세요!'}
      </EmptyDescription>
      <ActionButton
        onClick={() => navigate(activeTab === 'posts' ? '/write' : '/home')}
      >
        {activeTab === 'posts' ? '칭찬글 작성하기' : '칭찬글 보러가기'}
      </ActionButton>
    </EmptyState>
  );

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
        {loading ? (
          <div>로딩 중...</div>
        ) : praiseItems.length > 0 ? (
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
        ) : (
          renderEmptyState()
        )}
      </PraiseListSection>
    </Container>
  );
};

export default MyPraiseCollectionPage;
