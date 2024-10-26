import styled from '@emotion/styled';
import { Smile } from 'lucide-react';
import { Siren } from 'lucide-react';

const Container = styled.div`
  //width: 100%;
  //max-width: 440px;
  margin-bottom: 20px;
  padding: 20px 15px;
  background-color: #fff;
  //border: 1px solid #e0e0e0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-right: 8px;
`;

const Icon = styled(Siren)`
  margin-left: 4px;
  color: #777;
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
`;

const CommentInfo = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 10px;
`;

const CommentButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #007bff;
  background-color: #e0f4ff;
  padding: 6px 12px;
  border-radius: 16px;
  border: 1px solid #a0d8f1;
  cursor: pointer;
  margin-left: 8px;

  svg {
    margin-right: 4px;
  }
`;

const ComplimentItem = () => (
  <Container>
    <Header>
      <TitleWrapper>
        <Title>꽃내랑</Title>
        <Icon />
        신고하기
      </TitleWrapper>
      <Date>2023.5.20</Date>
    </Header>
    <Content>
      오늘 피그마를 배웠어요. 프레임도 만들고 가이드도 만들고 넷플릭스도 만들고
      토스도 만들고 이미지도 넣고, 많이 배웠어요. 이제 기본적인건 할 수 있어요
    </Content>
    <CommentInfo>칭찬댓글 12개</CommentInfo>
    <CommentButton>
      <Smile />
      칭찬댓글 달기
    </CommentButton>
  </Container>
);

export default ComplimentItem;
