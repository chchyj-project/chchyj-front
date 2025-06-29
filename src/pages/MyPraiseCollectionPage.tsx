// MyPraiseCollectionPage.tsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Heart } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Container,
  Header,
  BackButton,
  TabMenu,
  Tab,
  DateInfo,
  PraiseContent,
  PraiseListSection,
  PraiseItemWrapper,
  PraiseMeta,
  CommentCount,
  PraiseBubble,
  UserName,
  ContentWrapper,
  DateContentWrapper,
  NickNameText,
  CommentInfoText,
} from './MyPraiseCollectionPage.styles.ts';
import { Title as TitleLogo } from '../style/commonStyle.ts';
import Footer from '../components/Footer.tsx';
import { MyArticle, useArticleStore } from '../store/useArticleStore.ts';
import dayjs from 'dayjs';
import { CommentIcon } from '../components/PraiseItem.styles.ts';
import Comment from '../images/comment.png';
import { axiosInstance } from '../api/axiosConfig.ts';
import { ThumbUpIcon } from './PraiseDetailPage.styles.ts';
import ThumbUp from '../images/thumb_up_bordered.png';


// 댓글 타입 정의
interface MyComment {
  id: number;
  nickname: string;
  content: string;
  createdAt: string;
  likeCount: number;
  userId: number;
  articleId: number;
  replyStatus: 'ready' | 'normal';
}

interface MyCommentResponse {
  list: MyComment[];
  pageInfo: {
    totalCount: number;
    limit: number;
    offset: number;
  };
}

// 메인 컴포넌트
const MyPraiseCollectionPage: React.FC = () => {
  const { fetchMyArticlesWithPagination } = useArticleStore();
  const navigate = useNavigate();
  const [praiseItems, setPraiseItems] = useState<MyArticle[]>([]);
  const [commentItems, setCommentItems] = useState<MyComment[]>([]);
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

  // 내 댓글 가져오는 함수 추가
  const fetchMyCommentsWithPagination = async (
    page: number,
    size: number = 10,
  ): Promise<MyCommentResponse> => {
    try {
      const response = await axiosInstance.get(
        `/replies/my-replies?offset=${page}&limit=${size}`,
      );
      console.log('내 댓글 응답>>>', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching my comments:', error);
      return {
        list: [],
        pageInfo: { totalCount: 0, limit: size, offset: page },
      };
    }
  };

  // 데이터 로딩
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'posts') {
          const response = await fetchMyArticlesWithPagination(1, 10);
          console.log('response>>>', response);
          setPraiseItems(response.list);
        } else {
          const response = await fetchMyCommentsWithPagination(1, 10);
          console.log('댓글 response>>>', response);
          setCommentItems(response.list);
          console.log('commentItems>>>', response.list);
        }
      } catch (error) {
        console.error('Failed to fetch items:', error);
        if (activeTab === 'posts') {
          setPraiseItems([]);
        } else {
          setCommentItems([]);
        }
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
  // 댓글 렌더링 함수 (renderPosts와 동일한 구조로 수정)
  const renderComments = () => {
    return commentItems.map((item) => (
      <PraiseItemWrapper key={item.id}>
        <PraiseBubble $replyStatus={item.replyStatus}>
          <PraiseMeta>
            <UserName style={{ marginBottom: '8px' }}>
              <NickNameText>{item.nickname}</NickNameText>
              <CommentInfoText>님의 글에 남긴 댓글입니다.</CommentInfoText>
            </UserName>
            {item.replyStatus === 'ready' && (
              <CommentCount>
                <ThumbUpIcon src={ThumbUp} size={15} />
                <span>추천을 기다려요</span>
              </CommentCount>
            )}
          </PraiseMeta>

          <DateContentWrapper $replyStatus={item.replyStatus}>
            <DateInfo>{dayjs(item.createdAt).format('YYYY.MM.DD')}</DateInfo>
            <PraiseContent>{item.content}</PraiseContent>
          </DateContentWrapper>
        </PraiseBubble>
      </PraiseItemWrapper>
    ));
  };

  // 칭찬글 렌더링 함수
  const renderPosts = () => {
    return praiseItems.map((item) => (
      <PraiseItemWrapper key={item.id}>
        {/* 메타 정보: 날짜와 댓글 수 */}
        <PraiseMeta>
          <DateInfo>{dayjs(item.createdAt).format('YYYY.MM.DD')}</DateInfo>
          <CommentCount>
            <CommentIcon src={Comment} alt="Comment icon" />
            <span>칭찬댓글 {item.replyCount ?? 0}개</span>
          </CommentCount>
        </PraiseMeta>

        {/* 말풍선 스타일 박스 */}
        <PraiseBubble>
          <PraiseContent>{item.content}</PraiseContent>
        </PraiseBubble>
      </PraiseItemWrapper>
    ));
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
        {loading ? (
          <div>로딩 중...</div>
        ) : (
          <>{activeTab === 'posts' ? renderPosts() : renderComments()}</>
        )}
      </PraiseListSection>

      <Footer />
    </Container>
  );
};

export default MyPraiseCollectionPage;
