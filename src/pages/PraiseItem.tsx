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
  cursor: pointer;
`;

const WritingCommentWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: ${styleToken.color.secondary};

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

  const toggleCommentBox = () => {
    setIsCommentOpen(!isCommentOpen);
  };

  const createdAt = dayjs(article.createdAt);

  const moveToDetail = () => {
    navigate(`/post/${article.id}`);
  };

  console.log('article>>', article);

  return (
    <Container $islast={islast && !isCommentOpen}>
      <Header>
        <TitleWrapper>
          <Title>{article.userName}</Title>
          <AddtionalWrapper>
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
        <WritingCommentWrapper>
          <Smile size={'14px'} />
          칭찬댓글 달기
        </WritingCommentWrapper>
      </RowFlexBetween>
    </Container>
  );
};

export default PraiseItem;
