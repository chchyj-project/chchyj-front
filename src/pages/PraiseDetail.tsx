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

interface UpdateArticleResponse {
  content: string;
}

const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
  background: white;
  min-height: 100vh; // height: 100vh 대신 min-height: 100vh 사용
  padding-bottom: 100px; // 하단 버튼을 위한 여백 추가
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 10px 16px 16px 16px;
  border-bottom: 1px solid #e2e5e9;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const PostContainer = styled.article`
  padding: 20px;
  border-bottom: 1px solid #e2e5e9;
`;

const PostTitle = styled.h2`
  font-size: 16px;
  margin-bottom: 12px;
`;

const PostContent = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  margin-bottom: 8px;
`;

const PostDate = styled.span`
  font-size: 12px;
  color: #999;
`;

const CommentSection = styled.section`
  padding: 0 20px;
`;

const CommentItem = styled.div`
  padding: 19px 0;
  border-bottom: 1px solid #e2e5e9;
  position: relative;
  /* 마지막 요소의 border 제거 */
  &:last-child {
    border-bottom: none;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center; // 세로 중앙 정렬
  gap: 8px; // 요소들 사이의 간격
  margin-bottom: 8px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; // 세로 중앙 정렬
`;

const Nickname = styled.div`
  font-size: 14px;
  color: #333;
  font-weight: bolder;
  display: flex;
  align-items: center;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  //padding: 4px;
  cursor: pointer;
  font-size: 12px;
  color: #999;
  margin-right: auto; // 이 버튼 이후의 공간을 자동으로 채움
`;

const CommentContent = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  margin-bottom: 8px;
`;

const BottomButton = styled.button`
  //padding: 15px 100px;
  height: 56px;
  width: 90%;
  background-color: ${Common.colors.skyblue};
  color: ${styleToken.color.white};
  font-size: 18px;
  font-weight: 700;
  line-height: 19px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const LikeButton = styled.button`
  padding-right: 2px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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
  // 수정 모드 진입 시 현재 내용을 state에 설정
  const handleEdit = () => {
    setOpenDropdownId(-1);

    setIsEditing(true);
    setEditContent(articleDetail?.content || '');
  };

  const { mode } = location.state || '';
  // PraiseDetail 컴포넌트 내부

  // 드롭다운 토글 함수
  const handleDropdownToggle = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  useEffect(() => {
    // Skip if no article details yet
    if (!articleDetail?.replyList) return;

    const currentCommentCount = articleDetail.replyList.length;

    // If this is the initial load, just store the count without scrolling
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      previousCommentCountRef.current = currentCommentCount;
      return;
    }

    // Only scroll if:
    // 1. We're not in write mode (the panel just closed)
    // 2. The comment count increased (new comment was added)
    if (!isWriteMode && currentCommentCount > previousCommentCountRef.current) {
      // New comment was added, scroll to it
      setTimeout(() => {
        latestCommentRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    // Update the previous count reference
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
    console.log('여기여기___---->>');
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

    console.log('handleDelete', type, itemId);

    showConfirm(
      `${type} 삭제`,
      `정말로 이 ${type}을 삭제하시겠습니까?`,
      async () => {
        // 삭제 로직
        // 칭찬 게시글 삭제
        try {
          let isDeleted;

          if (type === '게시글') {
            // 게시글 삭제 함수 호출
            isDeleted = await deleteArticle(itemId);
            console.log('게시글 isDeleted>>', isDeleted);
          } else {
            // 댓글 삭제 함수 호출
            isDeleted = await deleteReply(itemId);
          }
          if (isDeleted) {
            // 성공 처리 (예: 토스트 메시지 표시)

            toast(`${type}이 삭제되었습니다.`);

            if (type === '게시글') {
              navigate('/home?userSocialId=' + nickname);
            } else {
              await fetchArticleDetail();
            }
            // 목록 다시 불러오기 등
          }
        } catch (error) {
          // 에러 처리
          toast(`${type} 삭제에 실패했습니다.`);
        }
      },
    );
    // setIsOpen(false);
  };

  const deleteReply = async (replyId: number) => {
    try {
      const response = await axiosInstance.delete(`/replies/${replyId}`);

      if (response.status === 200 || response.status === 204) {
        return true; // 삭제 성공
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
      console.log('좋아요 결과>>', result, 'nickname>>', loggedInNickname);
      const { data } = result;

      // 성공 처리
      if (result.status === 201 || result.status === 200) {
        // 성공 시 바로 UI 업데이트: 좋아요 상태 변경 및 게시글 데이터 갱신

        // 또는 더 효율적인 방법: 현재 상태를 직접 업데이트
        if (articleDetail) {
          const updatedReplyList = articleDetail.replyList.map((reply) => {
            if (reply.id === commentId) {
              return { ...reply, isLike: true }; // 좋아요 상태 변경
            }
            return reply;
          });

          // 업데이트된 리스트로 상태 갱신
          setArticleDetail({
            ...articleDetail,
            replyList: updatedReplyList,
          });
        }
      } else {
        toast(data.message);
      }
    } catch (error) {
      // 에러 처리 로직...
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
          <Content>{articleDetail?.content}</Content>
        </PostContainer>

        <CommentSection>
          {articleDetail?.replyList.map((comment, index) => (
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
                    type="comment" // 타입 구분을 위해 추가
                    itemId={comment.id}
                    handleDelete={() => handleDelete('댓글', comment.id)}
                  />
                )}
              </CommentHeader>
              <RowFlexBetween>
                <CommentContent>{comment.content}</CommentContent>
                <LikeButton onClick={() => like(comment.id)}>
                  <Heart
                    fill={comment.isLike ? '#87CEEB' : 'none'}
                    color="#87CEEB"
                    size={12}
                    className="cursor-pointer"
                  />
                </LikeButton>
              </RowFlexBetween>
              <PostDate>
                {dayjs(comment.createdAt).format('YYYY.MM.DD')}
              </PostDate>
            </CommentItem>
          ))}
        </CommentSection>

        {!isWriteMode && (
          <ScrollAwareBottomButtonWrapper visible={buttonVisible}>
            <BottomButton onClick={() => handleWriteClick(true)}>
              칭찬 댓글 달기
            </BottomButton>
          </ScrollAwareBottomButtonWrapper>
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
