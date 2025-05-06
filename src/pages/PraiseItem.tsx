import styled from 'styled-components';
import { Smile } from 'lucide-react';
import Siren from '../images/siren.png';
import styleToken from '../style/styleToken.ts';
import { Content, RowFlexBetween } from '../style/commonStyle.ts';
import React, { useEffect, useState } from 'react';
import { AddtionalWrapper, Icon, TitleWrapper } from '../style/MainPage.ts';
import { Article, ContainerProps } from '../types/MainPage.ts';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/axiosConfig.ts';
import { useApiError } from '../hooks/useApiError.ts';
import { useReportModalStore } from '../store/reportModalStore.ts';
import CommentActions from '../components/CommentActions.tsx';
import { useArticleStore } from '../store/useArticleStore.ts';
import { usePopup } from '../context/PopupContext.tsx';
import { toast } from 'react-toastify';
import Comment from '../images/comment.png';
import heart from '../images/heart2.png';
import tail from '../images/tail.png';


const Container = styled.div<ContainerProps>`
  margin-bottom: ${(props) => (props.$islast ? '0px' : '8px')};
   padding-bottom: 16px;
  background-color: #fff;
  border-bottom:1px solid #E1E2E4;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-right: 8px;
  color: #303030;
`;

const Date = styled.span`
  font-size: 11px;
  padding: 10px 0;
  color: #999;
`;

const CommentInfo = styled.div`
  font-size: 12px;
  color:  ${styleToken.color.primary};
`;

const WritingCommentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 126px;
  height: 26px;
  font-size: 12px;
  color: ${styleToken.color.secondary};
  border: 1px solid  ${styleToken.color.secondary};
  border-radius: 20px;

  cursor: pointer ;

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

const ContentBox = styled.div`
position: relative;
border: 1px solid #E1E2E4;
border-radius: 12px;
width:100%;
height:95px;
padding:16px;
margin-bottom: 16px;

`
const Tail = styled.div`
position: absolute;
bottom: -13px;
left: 16px;
width:12px;
height:15px;
background:#fff url("${tail}") no-repeat;
background-size: 100%;
`
const CommentIcon = styled.img`
 width:17px;
 height:16px; 
 margin-right: 4px;
`
const CommentBox = styled.div`
  display: flex;
  
`
const HeartIcon = styled.img`
  width:17px;
 height:16px; 
`
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
    // setIsOpen(false);
  };

  return (
    <>
      <Container $islast={islast && !isCommentOpen}>
        <Header>
          <TitleWrapper>
            {String(index)}
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
        <ContentBox><Content onClick={moveToDetail}>{article.content}</Content>
        <Tail></Tail>
        </ContentBox>
        

        <RowFlexBetween>
          <CommentBox>
          <CommentIcon src={Comment} alt='Comment icon'/>
          <CommentInfo onClick={toggleCommentBox}>
            칭찬댓글 {article.replyCount}개
          </CommentInfo>
          </CommentBox>
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
            
            <HeartIcon src={heart}  alt='heart icon'/>
            칭찬댓글 달기
          </WritingCommentWrapper>
        </RowFlexBetween>
      </Container>
    </>
  );
};

export default PraiseItem;
