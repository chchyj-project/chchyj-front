import Siren from '../images/siren.png';
import { Content, RowFlexBetween } from '../style/commonStyle.ts';
import React, { useEffect, useState } from 'react';
import { AddtionalWrapper, Icon, TitleWrapper } from '../style/MainPage.ts';
import { Article } from '../types/MainPage.ts';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useReportModalStore } from '../store/useReportModalStore.ts';
import CommentActions from '../components/CommentActions.tsx';
import { useArticleStore } from '../store/useArticleStore.ts';
import { usePopup } from '../context/PopupContext.tsx';
import { toast } from 'react-toastify';
import Comment from '../images/comment.png';
import heart from '../images/heart2.png';
import {
  Container,
  Header,
  Title,
  Date,
  CommentInfo,
  WritingCommentWrapper,
  RightGroup,
  ContentBox,
  Tail,
  CommentIcon,
  CommentBox,
  HeartIcon,
} from './PraiseItem.styles.ts';

import Common from '../style/Common.ts';

const PraiseItem = ({
  islast,
  index,
  article,
}: {
  islast: boolean;
  index: number;
  article: Article;
}) => {
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const loggedInUserId = localStorage.getItem('userId');
  const toggleCommentBox = () => {
    setIsCommentOpen(!isCommentOpen);
  };
  const { showConfirm } = usePopup();

  const createdAt = dayjs(article.createdAt);
  const { openReportModal } = useReportModalStore();
  const { fetchArticles, deleteArticle } = useArticleStore();
  const handleReportClick = (
    content: string,
    id: number,
    type: 'article' | 'reply',
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

  const handleDropdownToggle = (id: number) => {
    console.log('id>>>', id);
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleDelete = async (articleId: number) => {
    setOpenDropdownId(-1);

    showConfirm(
      '게시글 삭제',
      '정말로 이 게시글을 삭제하시겠습니까?',
      async () => {
        // 삭제 로직
        if (openDropdownId) {
          // 칭찬 게시글 삭제
          try {
            const isDeleted = await deleteArticle(articleId);
            if (isDeleted) {
              // 성공 처리 (예: 토스트 메시지 표시)
              toast('게시글이 삭제되었습니다.');
              // 목록 다시 불러오기 등
              await fetchArticles();
            }
          } catch (error) {
            toast('게시글 삭제에 실패했습니다.');
          }
          console.log('칭찬 게시글 삭제');
        }
      },
    );
  };

  return (
    <>
      <Container $islast={islast && !isCommentOpen}>
        <Header>
          <TitleWrapper>
            <Title>{article.nickname}</Title>
            <Date>{createdAt.format('YYYY.MM.DD')}</Date>
          </TitleWrapper>
          <RightGroup>
            <AddtionalWrapper
              onClick={() =>
                handleReportClick(article.content, article.id, 'article')
              }
            >
              신고하기
            </AddtionalWrapper>

            {String(article.userId) === loggedInUserId && (
              <CommentActions
                isopen={openDropdownId === article.id ? 'true' : 'false'}
                setIsOpen={(e) => {
                  e.stopPropagation();
                  handleDropdownToggle(article.id);
                }}
                type="comment"
                itemId={article.id}
                handleDelete={() => handleDelete(article.id)}
              />
            )}
          </RightGroup>
        </Header>
        <ContentBox>
          <Content onClick={moveToDetail}>{article.content}</Content>
          <Tail />
        </ContentBox>

        <RowFlexBetween>
          <CommentBox>
            <CommentIcon src={Comment} alt="Comment icon" />
            <CommentInfo onClick={toggleCommentBox}>
              {article.replyCount === 0
                ? '요정님을 기다려요!'
                : `칭찬댓글 ${article.replyCount}개`}
            </CommentInfo>
          </CommentBox>
          {String(loggedInUserId) !== String(article.userId) ? (
            <WritingCommentWrapper
              onClick={() =>
                navigate(`/post/${article.id}?openComment=true`)
              }
            >
              <HeartIcon src={heart} alt="heart icon" />
              칭찬요정 보내기
            </WritingCommentWrapper>
          ) : (
            <WritingCommentWrapper
              $backgroundColor={Common.colors.mainBlue}
              $fontColor={Common.colors.white}
            >
              <HeartIcon src={heart} alt="heart icon" />
              칭찬요정이 도착했어요!
            </WritingCommentWrapper>
          )}
        </RowFlexBetween>
      </Container>
    </>
  );
};

export default PraiseItem;
