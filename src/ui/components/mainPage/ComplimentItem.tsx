import styled from '@emotion/styled';
import { Smile } from 'lucide-react';
import Siren from '../../../assets/siren.png';
import styleToken from '../../styles/styleToken.ts';
import { RowFlexBetween } from '../../styles/commonStyle.ts';
interface ContainerProps {
  isLast?: boolean;
}
const Container = styled.div<ContainerProps>`
  margin-bottom: ${(props) => (props.isLast ? '0px' : '8px')};
  padding: 20px 15px;
  background-color: #fff;
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
  color: #111111;
`;

const Icon = styled.img`
  margin-left: 4px;
  width: 12px;
  height: 12px;
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

const AddtionalWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: ${styleToken.color.textSub};

  svg {
    margin-right: 4px;
  }
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

const ComplimentItem = ({
  isLast,
  index,
}: {
  isLast: boolean;
  index: number;
}) => (
  <Container isLast={isLast}>
    <Header>
      <TitleWrapper>
        <Title>꽃내랑 {index}</Title>
        <AddtionalWrapper>
          <Icon src={Siren} />
          신고하기
        </AddtionalWrapper>
      </TitleWrapper>
      <Date>2023.5.20</Date>
    </Header>
    <Content>
      오늘 피그마를 배웠어요. 프레임도 만들고 가이드도 만들고 넷플릭스도 만들고
      토스도 만들고 이미지도 넣고, 많이 배웠어요. 이제 기본적인건 할 수 있어요
    </Content>
    <RowFlexBetween>
      <CommentInfo>칭찬댓글 12개</CommentInfo>
      <WritingCommentWrapper>
        <Smile size={'14px'} />
        칭찬댓글 달기
      </WritingCommentWrapper>
    </RowFlexBetween>
  </Container>
);

export default ComplimentItem;
