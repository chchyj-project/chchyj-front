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
import { MyArticle, useArticleStore } from '../store/useArticleStore.ts';

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
  const { fetchMyArticlesWithPagination } = useArticleStore();
  const navigate = useNavigate();
  const [praiseItems, setPraiseItems] = useState<MyArticle[]>([]);
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
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchMyArticlesWithPagination(1, 10);
        console.log('response>>>', response);
        setPraiseItems(response.list);
      } catch (error) {
        console.error('Failed to fetch praise items:', error);
        setPraiseItems([]);
      }
      setLoading(false);
    };

    fetchData();
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
