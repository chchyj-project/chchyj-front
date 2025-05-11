import { ChevronLeft, Heart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { ArticleDetail } from '../types/PraiseItem.ts';
import { axiosInstance } from '../api/axiosConfig.ts';
import { useParams } from 'react-router-dom';
import { RowFlexBetween } from '../style/commonStyle.ts';
import CommentActions from '../components/CommentActions.tsx';
import dayjs from 'dayjs';
import WriteCommentSlidingPanel from './WriteCommentSlidingPanel.tsx';
import Siren from '../images/siren.png';
import { Icon } from '../style/MainPage.ts';
import { useReportModalStore } from '../store/reportModalStore.ts';
import { toast } from 'react-toastify';
import { useScrollDirection } from '../hooks/useScrollDirection.ts';
import { usePopup } from '../context/PopupContext.tsx';
import { useArticleStore } from '../store/useArticleStore.ts';
import axios from 'axios';
import { Plus } from 'lucide-react';
import {
  Container,
  Header,
  BackButton,
  PostContainer,
  PostTitle,
  StyledContent,
  PostDate,
  CommentSection,
  CommentItem,
  CommentHeader,
  PostHeader,
  Nickname,
  ActionButton,
  CommentContent,
  LikeButton,
  LikeContainer,
  FloatingButtonWrapper,
  FloatingActionButton,
  Tooltip,
} from './PraiseDetail.styles.ts';

export default function PraiseDetail() {
  const navigate = useNavigate();
  const nickname = localStorage.getItem('nickname');
  const { postId } = useParams();
  const [isWriteMode, setWriteMode] = useState(false);
  const [bgColor, setBgColor] = useState<string>('white');
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const { openReportModal } = useReportModalStore();
  const latestCommentRef = useRef<HTMLDivElement | null>(null);
  const previousCommentCountRef = useRef<number>(0);
  const initialLoadRef = useRef<boolean>(true);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [articleDetail, setArticleDetail] = useState<ArticleDetail | null>(
    null,
  );
  const { buttonVisible } = useScrollDirection();
  const { showConfirm } = usePopup();
  const { deleteArticle } = useArticleStore();

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

  const { mode } = location.state || '';

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

    if (!isWriteMode && currentCommentCount > previousCommentCountRef.current) {
      setTimeout(() => {
        latestCommentRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    previousCommentCountRef.current = currentCommentCount;
  }, [articleDetail, isWriteMode]);

  const fetchArticleDetail = async () => {
    try {
      const { data } = await axiosInstance.get(`/articles/${postId}`);
      console.log('detail data>>', data);
      setArticleDetail(data);
    } catch (error) {
      console.error('상세 조회 중 에러 발생:', error);
    }
  };

  useEffect(() => {
    fetchArticleDetail();
  }, [postId, isWriteMode]);

  useEffect(() => {
    if (mode === 'commentOpen') {
      handleWriteClick(true);
    }
  }, [mode]);

  const handleWriteClick = async (isWriteMode: boolean) => {
    if (isWriteMode) {
      setBgColor('#4D4D4D');
    } else {
      setBgColor('white');
    }
    setWriteMode(isWriteMode);
  };

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

  const like = async (commentId: number) => {
    try {
      const result = await axiosInstance.post<any>(
        `/replies/${commentId}/like`,
      );

      if (result.status === 201 || result.status === 200) {
        if (articleDetail) {
          const updatedReplyList = articleDetail.replyList.map((reply) => {
            if (reply.id === commentId) {
              return { ...reply, isLike: true };
            }
            return reply;
          });

          setArticleDetail({
            ...articleDetail,
            replyList: updatedReplyList,
          });
        }
      } else {
        toast(result.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast(
          error.response.data.message || '요청 처리 중 오류가 발생했습니다.',
        );
      } else {
        toast('네트워크 오류가 발생했습니다.');
      }
    }
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
            <PostTitle>{articleDetail?.nickname}</PostTitle>
            {articleDetail?.nickname == loggedInNickname && !isEditing && (
              <CommentActions
                isopen={openDropdownId === 0 ? 'true' : 'false'}
                setIsOpen={() => handleDropdownToggle(0)}
                type="post"
                itemId={articleDetail?.id}
                handleEdit={handleEdit}
                handleDelete={() =>
                  handleDelete('게시글', Number(articleDetail?.id))
                }
              />
            )}
          </PostHeader>
          <StyledContent>{articleDetail?.content}</StyledContent>
          <PostDate>
            {articleDetail?.createdAt &&
              dayjs(articleDetail.createdAt).format('YYYY.MM.DD')}
          </PostDate>
        </PostContainer>

        <CommentSection>
          {articleDetail?.replyList && articleDetail.replyList.length > 0 ? (
            articleDetail.replyList.map((comment, index) => (
              <CommentItem
                key={comment.id}
                ref={
                  index === articleDetail.replyList.length - 1
                    ? (node) => {
                        latestCommentRef.current = node;
                      }
                    : undefined
                }
              >
                <CommentHeader>
                  <Nickname>{comment.nickname}</Nickname>
                  <Icon src={Siren} size={'12px'} />
                  <ActionButton
                    onClick={() =>
                      handleReportClick(comment.content, comment.id, 'reply')
                    }
                  >
                    신고하기
                  </ActionButton>

                  {comment.canDelete && (
                    <CommentActions
                      isopen={openDropdownId === comment.id ? 'true' : 'false'}
                      setIsOpen={() => handleDropdownToggle(comment.id)}
                      type="comment"
                      itemId={comment.id}
                      handleDelete={() => handleDelete('댓글', comment.id)}
                    />
                  )}
                </CommentHeader>
                <RowFlexBetween>
                  <CommentContent>{comment.content}</CommentContent>
                  <LikeContainer>
                    <LikeButton onClick={() => like(comment.id)}>
                      <Heart
                        fill={comment.isLike ? '#87CEEB' : 'none'}
                        color="#87CEEB"
                        size={14}
                        className="cursor-pointer"
                      />
                    </LikeButton>
                  </LikeContainer>
                </RowFlexBetween>
                <PostDate>
                  {dayjs(comment.createdAt).format('YYYY.MM.DD')}
                </PostDate>
              </CommentItem>
            ))
          ) : (
            <div
              style={{ padding: '30px 0', textAlign: 'center', color: '#999' }}
            >
              아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
            </div>
          )}
        </CommentSection>

        {/* 플로팅 버튼 추가 */}
        {!isWriteMode && (
          <FloatingButtonWrapper>
            <FloatingActionButton onClick={() => handleWriteClick(true)}>
              <Plus size={24} strokeWidth={2.5} />
              <Tooltip>칭찬 댓글 달기</Tooltip>
            </FloatingActionButton>
          </FloatingButtonWrapper>
        )}
      </Container>
      {isWriteMode && (
        <WriteCommentSlidingPanel
          isWriteMode={isWriteMode}
          handleWriteClick={handleWriteClick}
        />
      )}
    </>
  );
}
