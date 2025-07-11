import { ChevronLeft } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { ArticleDetail } from '../types/PraiseItem.ts';
import { axiosInstance } from '../api/axiosConfig.ts';
import { useParams } from 'react-router-dom';
import CommentActions from '../components/CommentActions.tsx';
import dayjs from 'dayjs';
import { useReportModalStore } from '../store/useReportModalStore.ts';
import { toast } from 'react-toastify';
import { usePopup } from '../context/PopupContext.tsx';
import { useArticleStore } from '../store/useArticleStore.ts';
import Comment from '../images/comment.png';
import GreyComment from '../images/grey_comment.png';
import {
  Container,
  Header,
  BackButton,
  PostContainer,
  PostHeader,
  CommentInfo,
  CommentListContainer,
  CommentItem,
  CommentBubble,
  CommentAuthorInfo,
  CommentContent,
  CommentAuthorSection,
  CommentAuthorName,
  CommentHeader,
  CommentDate,
  ContentDetailBox,
  StyledContent,
  ThumbUpWrapper,
  ThumbUpIcon,
  RecommendSection,
  FloatingButton,
  FloatingButtonContainer,
  Tooltip,
  EmptyCommentContainer,
} from './PraiseDetailPage.styles.ts';
import { CommentIcon } from '../components/PraiseItem.styles.ts';
import { TitleWrapper } from '../style/MainPage.ts';
import { Date, Title } from '../components/PraiseItem.styles.ts';
import ThumbUp from '../images/thumb_up.png';
import CommentWritePanel from '../components/modal/CommentWritePanel.tsx';

export default function PraiseDetail() {
  const navigate = useNavigate();
  const nickname = localStorage.getItem('nickname');
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const [isWriteMode, setWriteMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const { openReportModal } = useReportModalStore();
  const latestCommentRef = useRef<HTMLDivElement | null>(null);
  const previousCommentCountRef = useRef<number>(0);
  const initialLoadRef = useRef<boolean>(true);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [articleDetail, setArticleDetail] = useState<ArticleDetail | null>(
    null,
  );
  const { showConfirm } = usePopup();
  const { deleteArticle } = useArticleStore();
  const [isCommentWriteMode, setIsCommentWriteMode] = useState(false);

  const handleReportClick = (
    content: string,
    id: number,
    type: 'article' | 'reply',
  ) => {
    openReportModal(content, id, type);
  };

  const loggedInNickname = localStorage.getItem('nickname');

  const handleEdit = () => {
    setOpenDropdownId(-1);
    setIsEditing(true);
    setEditContent(articleDetail?.content || '');
  };

  const handleDropdownToggle = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  useEffect(() => {
    if (!articleDetail?.replyList) return;

    const currentCommentCount = articleDetail.replyList.length;

    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      previousCommentCountRef.current = currentCommentCount;
      return;
    }

    if (
      !isWriteMode &&
      currentCommentCount > previousCommentCountRef.current
    ) {
      setTimeout(() => {
        latestCommentRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    previousCommentCountRef.current = currentCommentCount;
  }, [articleDetail, isWriteMode]);

  const fetchArticleDetail = async () => {
    try {
      const { data } = await axiosInstance.get(`/articles/${postId}`);
      setArticleDetail(data);
    } catch (error) {
      console.error('상세 조회 중 에러 발생:', error);
    }
  };

  useEffect(() => {
    fetchArticleDetail();

    // URL의 query parameter를 확인하여 댓글 작성 모달 열기
    const openComment = searchParams.get('openComment');
    if (openComment === 'true') {
      setIsCommentWriteMode(true);
    }
  }, [postId, isWriteMode, searchParams]);

  const moveToListPage = () => {
    navigate('/home?userSocialId=' + nickname);
  };

  const handleDelete = async (type: '게시글' | '댓글', itemId: number) => {
    setOpenDropdownId(-1);

    showConfirm(
      `${type} 삭제`,
      `정말로 이 ${type}을 삭제하시겠습니까?`,
      async () => {
        try {
          let isDeleted;

          if (type === '게시글') {
            isDeleted = await deleteArticle(itemId);
          } else {
            isDeleted = await deleteReply(itemId);
          }

          if (isDeleted) {
            toast(`${type}이 삭제되었습니다.`);

            if (type === '게시글') {
              navigate('/home?userSocialId=' + nickname);
            } else {
              await fetchArticleDetail();
            }
          }
        } catch (error) {
          toast(`${type} 삭제에 실패했습니다.`);
        }
      },
    );
  };

  const deleteReply = async (replyId: number) => {
    try {
      const response = await axiosInstance.delete(`/replies/${replyId}`);

      if (response.status === 200 || response.status === 204) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('댓글 삭제 중 에러 발생:', error);
      throw error;
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) {
      toast.warn('댓글 내용을 입력해주세요.');
      return;
    }
    try {
      await axiosInstance.post(`/replies`, {
        articleId: postId,
        content: commentContent,
      });
      setCommentContent('');
      await fetchArticleDetail();
    } catch (error) {
      console.error('댓글 작성 중 에러 발생:', error);
      toast.error('댓글 작성에 실패했습니다.');
    }
  };

  const handleFloatingButtonClick = () => {
    toast.info('버튼이 클릭되었습니다!');
  };

  const handleWriteClick = (mode: boolean) => {
    setIsCommentWriteMode(mode);
  };

  const handleCommentAdded = () => {
    fetchArticleDetail();
  };

  return (
    <>
      <Container>
        <Header>
          <BackButton onClick={moveToListPage}>
            <ChevronLeft size={24} />
          </BackButton>
        </Header>
        <PostContainer>
          <PostHeader>
            <TitleWrapper>
              <Title>{articleDetail?.nickname}</Title>
              <Date>
                {articleDetail?.createdAt &&
                  dayjs(articleDetail.createdAt).format('YYYY.MM.DD')}
              </Date>
            </TitleWrapper>
            {articleDetail?.nickname === loggedInNickname && !isEditing && (
              <CommentActions
                isopen={openDropdownId === 0 ? 'true' : 'false'}
                setIsOpen={() => handleDropdownToggle(0)}
                type="post"
                itemId={articleDetail?.id}
                canDelete={true}
                handleEdit={handleEdit}
                handleDelete={() =>
                  handleDelete('게시글', Number(articleDetail?.id))
                }
              />
            )}
          </PostHeader>
          <ContentDetailBox>
            <StyledContent>{articleDetail?.content}</StyledContent>
          </ContentDetailBox>
          <CommentInfo>
            <CommentIcon src={Comment} alt="Comment icon" />
            <span>칭찬댓글 {articleDetail?.replyList.length || 0}개</span>
          </CommentInfo>
        </PostContainer>
        <CommentListContainer>
          {articleDetail?.replyList && articleDetail.replyList.length > 0 ? (
            articleDetail.replyList.map((comment, index) => {
              const isOwn = comment.nickname === loggedInNickname;
              return (
                <CommentItem
                  key={comment.id}
                  isOwn={isOwn}
                  canRecommend={comment.canRecommend}
                  ref={
                    index === articleDetail.replyList.length - 1
                      ? latestCommentRef
                      : undefined
                  }
                >
                  <CommentBubble isOwn={isOwn}>
                    <CommentHeader>
                      <CommentAuthorSection>
                        <CommentAuthorInfo>
                          <CommentAuthorName>
                            {comment.nickname}
                          </CommentAuthorName>
                          <CommentDate>
                            {dayjs(comment.createdAt).format('YYYY.M.D')}
                          </CommentDate>
                        </CommentAuthorInfo>
                      </CommentAuthorSection>
                      <RecommendSection>
                        {comment.canRecommend && (
                          <ThumbUpWrapper>
                            <ThumbUpIcon src={ThumbUp} alt="추천" />
                          </ThumbUpWrapper>
                        )}
                        <CommentActions
                          isopen={
                            openDropdownId === comment.id ? 'true' : 'false'
                          }
                          setIsOpen={() => handleDropdownToggle(comment.id)}
                          type="comment"
                          itemId={comment.id}
                          canDelete={comment.canDelete}
                          handleDelete={() =>
                            handleDelete('댓글', comment.id)
                          }
                        />
                      </RecommendSection>
                    </CommentHeader>
                    <CommentContent>{comment.content}</CommentContent>
                  </CommentBubble>
                </CommentItem>
              );
            })
          ) : (
            <EmptyCommentContainer>
              <CommentIcon src={GreyComment} alt="Comment icon" $width="20px" $height="20px" />
              댓글을 기다리고 있어요
            </EmptyCommentContainer>
          )}
        </CommentListContainer>
      </Container>

      <FloatingButtonContainer>
        <Tooltip>댓글 작성</Tooltip>
        <FloatingButton onClick={() => handleWriteClick(true)}>
          댓글<br />입력
        </FloatingButton>
      </FloatingButtonContainer>

      <CommentWritePanel
        isOpen={isCommentWriteMode}
        onClose={() => handleWriteClick(false)}
        articleId={postId || ''}
        onCommentAdded={handleCommentAdded}
      />
    </>
  );
}
