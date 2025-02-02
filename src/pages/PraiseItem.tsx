import styled from 'styled-components';
import { Smile } from 'lucide-react';
import Siren from '../images/siren.png';
import styleToken from '../style/styleToken.ts';
import { RowFlexBetween } from '../style/commonStyle.ts';
import { useEffect, useState } from 'react';
import { AddtionalWrapper, Icon, TitleWrapper } from '../style/MainPage.ts';
import { Article, ContainerProps } from '../types/MainPage.ts';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/axiosConfig.ts';
import axios from 'axios';

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

const Content = styled.p`
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

const CommentContainer = styled.div`
  width: 100%;
`;

const StartGreyLine = styled.div`
  width: 100%;
  background-color: #e9e9e9;
  height: 0.5px;
  margin: 25px 0 12.5px 0;
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

  console.log('article>>', article);
  const [toastMsg, setToastMsg] = useState<string>('');
  const [toast, setToast] = useState<boolean>(false);
  const toggleCommentBox = () => {
    setIsCommentOpen(!isCommentOpen);
  };

  const createdAt = dayjs(article.createdAt);

  const moveToDetail = () => {
    navigate(`/post/${article.id}`);
  };

  console.log('article>>', article);
  const abuse = async () => {
    try {
      const result = await axiosInstance.post<any>('/abuse', {
        reason: '',
        id: Number(article.id),
        type: '',
      });

      console.log('result-=-->', result);

      if (result.status === 201 || result.status === 200) {
        // 성공적으로 저장됨
        console.log('댓글이 성공적으로 저장되었습니다:', result.data);

        // 예시: 토스트 메시지 표시
        setToast(true);
        setToastMsg('댓글이 성공적으로 저장되었습니다.');
      }
    } catch (error) {
      // 타입 가드를 사용한 에러 처리
      if (axios.isAxiosError(error)) {
        // HTTP 에러 처리
        if (error.response) {
          // 서버가 응답을 반환한 경우
          switch (error.response.status) {
            case 400:
              setToast(true);
              setToastMsg(error.response.data.message);
              break;
            case 401:
              setToast(true);
              setToastMsg('로그인이 필요합니다');
              // 예시: 로그인 페이지로 리다이렉트
              navigate('/login');
              break;
            case 403:
              setToast(true);
              setToastMsg('권한이 없습니다');
              break;
            default:
              setToast(true);
              setToastMsg('저장 중 오류가 발생했습니다');
          }
        } else if (error.request) {
          // 요청은 보냈지만 응답을 받지 못한 경우
          setToast(true);
          setToastMsg('서버와 통신할 수 없습니다');
        }
      } else {
        // 기타 예상치 못한 에러
        setToast(true);
        setToastMsg('알 수 없는 오류가 발생했습니다');
        console.error('Error saving article:', error);
      }
    } finally {
      // 예시: 로딩 상태 해제
      // setIsLoading(false);
    }
  };

  const openAbuseModal = () => {};

  return (
    <Container $islast={islast && !isCommentOpen}>
      <Header>
        <TitleWrapper>
          <Title>{article.userName}</Title>
          <AddtionalWrapper onClick={openAbuseModal}>
            <Icon src={Siren} size={'12px'} />
            신고하기
          </AddtionalWrapper>
        </TitleWrapper>
        <Date>{createdAt.format('YYYY.MM.DD')}</Date>
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
  );
};

export default PraiseItem;
