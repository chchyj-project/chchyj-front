import styled from 'styled-components';
import { Smile } from 'lucide-react';
import Siren from '../images/siren.png';
import styleToken from '../style/styleToken.ts';
import { RowFlexBetween } from '../style/commonStyle.ts';
import React, { useEffect, useState } from 'react';
import { AddtionalWrapper, Icon, TitleWrapper } from '../style/MainPage.ts';
import { Article, ContainerProps } from '../types/MainPage.ts';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/axiosConfig.ts';
import axios from 'axios';
import { useApiError } from '../hooks/useApiError.ts';
import ToastPopup from '../components/ToastPopup.tsx';
import { useReportModalStore } from '../store/reportModalStore.ts';
import CommentActions from '../components/CommentActions.tsx';
import { useArticleStore } from '../store/useArticleStore.ts';

const Container = styled.div<ContainerProps>`
  margin-bottom: ${(props) => (props.$islast ? '0px' : '8px')};
  padding: 20px 15px;
  background-color: #fff;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-right: 8px;
  color: #111111;
`;

const Date = styled.span`
  font-size: 14px;
  color: #999;
`;

const Content = styled.span`
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  margin: 10px 0;
  cursor: pointer;
`;

const CommentInfo = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 10px;
`;

const WritingCommentWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: ${styleToken.color.secondary};
  cursor: pointer;

  svg {
    margin-right: 4px;
  }
`;

// 새로 추가할 스타일드 엘리먼트
const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; // Date와 CommentActions 사이의 간격
`;
const PraiseItem = ({
  islast,
  article,
}: {
  islast: boolean;
  index: number;
  article: Article;
}) => {
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string>('');
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const loggedInUserId = localStorage.getItem('userId');
  const toggleCommentBox = () => {
    setIsCommentOpen(!isCommentOpen);
  };

  console.log('loggedInUserId>.', loggedInUserId);
  const { toast, toastMsg, setToast, handleApiError } = useApiError();

  const createdAt = dayjs(article.createdAt);
  const { openReportModal } = useReportModalStore();
  const {
    articles,
    isWriteMode,
    bgColor,
    nickname,
    fetchArticles,
    setArticles,
    setWriteMode,
    setNickname,
    setBgColor,
  } = useArticleStore();
  const handleReportClick = (
    content: string,
    id: number,
    type: 'post' | 'comment',
  ) => {
    openReportModal(content, id, type);
  };

  // document 레벨에서 클릭 이벤트를 감지하는 useEffect 추가
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // 모달이 열려있을 때만 동작
      if (openDropdownId !== null) {
        // 클릭된 요소가 모달 내부 요소가 아닌 경우에만 모달 닫기
        const target = e.target as HTMLElement;
        if (!target.closest('.comment-actions')) {
          setOpenDropdownId(null);
        }
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener('click', handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openDropdownId]);

  const moveToDetail = () => {
    navigate(`/post/${article.id}`);
  };

  const abuse = async () => {
    try {
      const result = await axiosInstance.post<any>('/abuse', {
        reason: '',
        id: Number(article.id),
        type: '',
      });

      if (result.status === 201 || result.status === 200) {
        // 성공적으로 저장됨
        console.log('댓글이 성공적으로 저장되었습니다:', result.data);

        // 예시: 토스트 메시지 표시
        setToast(true);
        setToastMessage('댓글이 성공적으로 저장되었습니다.');
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDropdownToggle = (id: number, e?: React.MouseEvent) => {
    // e.stopPropagation(); // 이벤트 전파 중단
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const deletePost = async (articleId: number) => {
    try {
      const response = await axiosInstance.delete(`/articles/${articleId}`);

      if (response.status === 200 || response.status === 204) {
        return true; // 삭제 성공
      }
      return false;
    } catch (error) {
      console.error('게시글 삭제 중 에러 발생:', error);
      throw error;
    }
  };

  const handleDelete = async (articleId: number) => {
    setOpenDropdownId(-1);
    // 삭제 로직
    if (openDropdownId) {
      // 칭찬 게시글 삭제
      try {
        const isDeleted = await deletePost(articleId);
        if (isDeleted) {
          // 성공 처리 (예: 토스트 메시지 표시)
          setToast(true);

          setToastMessage('게시글이 삭제되었습니다.');
          // 목록 다시 불러오기 등
          await fetchArticles();
        }
      } catch (error) {
        // 에러 처리
        setToast(true);

        setToastMessage('게시글 삭제에 실패했습니다.');
      }
      console.log('칭찬 게시글 삭제');
    }
    // setIsOpen(false);
  };

  return (
    <>
      {toast && (
        <ToastPopup
          setToast={setToast}
          message={toastMessage || toastMsg}
          position="middle"
        />
      )}
      <Container $islast={islast && !isCommentOpen}>
        <Header>
          <TitleWrapper>
            <Title>{article.nickname}</Title>
            <AddtionalWrapper
              onClick={() =>
                handleReportClick(article.content, article.id, 'comment')
              }
            >
              <Icon src={Siren} size={'12px'} />
              신고하기
            </AddtionalWrapper>
          </TitleWrapper>
          <RightGroup>
            <Date>{createdAt.format('YYYY.MM.DD')}</Date>
            {String(article.userId) === loggedInUserId && (
              <CommentActions
                className="comment-actions" // 클래스 이름 추가
                isopen={openDropdownId === article.id ? 'true' : 'false'}
                setIsOpen={(e: any) => handleDropdownToggle(article.id, e)}
                type="comment"
                commentId={article.id}
                handleDelete={() => handleDelete(article.id)}
              />
            )}
          </RightGroup>
        </Header>
        <Content onClick={moveToDetail}>{article.content}</Content>
        <RowFlexBetween>
          <CommentInfo onClick={toggleCommentBox}>
            칭찬댓글 {article.commentCount}개
          </CommentInfo>
          <WritingCommentWrapper
            onClick={() =>
              // URL에는 안보이지만 state로 데이터 전달
              navigate(`/post/${article.id}`, {
                state: {
                  mode: 'commentOpen',
                },
              })
            }
          >
            <Smile size={'14px'} />
            칭찬댓글 달기
          </WritingCommentWrapper>
        </RowFlexBetween>
      </Container>
    </>
  );
};

export default PraiseItem;
