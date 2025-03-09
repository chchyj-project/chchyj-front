import styled from 'styled-components';
import { ChevronLeft, Heart } from 'lucide-react';
import Common from '../style/Common.ts';
import styleToken from '../style/styleToken.ts';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { ArticleDetail } from '../types/PraiseItem.ts';
import { axiosInstance } from '../api/axiosConfig.ts';
import { useParams } from 'react-router-dom';
import {
  Content,
  RowFlexBetween,
  ScrollAwareBottomButtonWrapper,
} from '../style/commonStyle.ts';
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
import { Plus } from 'lucide-react'; // lucide-react 아이콘 추가

const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
  background: white;
  min-height: 100vh;
  padding-bottom: 110px; // 하단 버튼 여백 증가
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 12px 16px 16px 16px;
  border-bottom: 1px solid #e2e5e9;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

const PostContainer = styled.article`
  padding: 24px 20px;
  border-bottom: 1px solid #e2e5e9;
  margin-bottom: 8px;
`;

const PostTitle = styled.h2`
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #222;
`;

const StyledContent = styled(Content)`
  font-size: 15px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 8px;
  word-break: break-word;
  white-space: pre-wrap;
`;

const PostDate = styled.span`
  font-size: 12px;
  color: #888;
  display: block;
  margin-top: 4px;
`;

const CommentSection = styled.section`
  padding: 0 20px;
  margin-top: 4px;
`;

const CommentItem = styled.div`
  padding: 22px 0;
  border-bottom: 1px solid #e2e5e9;
  position: relative;

  /* 마지막 요소의 border 제거 */
  &:last-child {
    border-bottom: none;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Nickname = styled.div`
  font-size: 15px;
  color: #222;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  color: #888;
  margin-right: auto;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s;

  &:hover {
    color: #666;
  }
`;

const CommentContent = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 10px;
  word-break: break-word;
  white-space: pre-wrap;
`;

const BottomButton = styled.button`
  height: 58px;
  width: 90%;
  background-color: ${Common.colors.skyblue};
  color: ${styleToken.color.white};
  font-size: 17px;
  font-weight: 700;
  line-height: 19px;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #70c1e2;
  }
`;

const LikeButton = styled.button`
  padding: 6px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

// 플로팅 버튼 래퍼 - 컨테이너와 동일한 최대 너비를 적용
const FloatingButtonWrapper = styled.div`
  position: fixed;
  bottom: 24px;
  right: 0;
  left: 0;
  max-width: 768px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
  pointer-events: none;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
`;

// 둥근 플로팅 액션 버튼
const FloatingActionButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${Common.colors.skyblue};
  color: ${styleToken.color.white};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    background-color: #70c1e2;
  }

  &:active {
    transform: translateY(0);
  }
`;

// 툴팁 컴포넌트
const Tooltip = styled.div`
  position: absolute;
  top: -40px;
  right: 0;
  background-color: #333;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;

  ${FloatingActionButton}:hover & {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    right: 24px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
  }
`;
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
