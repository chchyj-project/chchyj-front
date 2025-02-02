import styled from 'styled-components';
import { AddtionalWrapper, Icon, TitleWrapper } from '../style/MainPage.ts';
import Siren from '../images/siren.png';
import { ContainerProps } from '../types/MainPage.ts';
import Heart from '../images/heart.png';

const CommentCard = styled.div<ContainerProps>`
  border-radius: 8px;
  padding: 12px 0;
  margin-top: ${(props) => (props.isFirst ? '12px' : '0px')};
  display: flex;
  flex-direction: column;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9em;
  color: #666666;
`;

const CommentContent = styled.div`
  margin-bottom: 12px;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  width: 100%;
  color: #8a8a8a;
`;

const NickName = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: #5c5c5c;
`;

const TextComment = styled.div`
  width: 90%;
`;
const LikeArea = styled.div`
  display: flex;
  gap: 2.5px;
`;

const Comment = ({
  commenterId,
  content,
  likeCount,
  isFirst,
}: {
  commenterId: string;
  content: string;
  likeCount: number;
  islast: boolean;
  isFirst: boolean;
}) => {
  return (
    <CommentCard isFirst={isFirst}>
      <CommentHeader>
        <TitleWrapper>
          <NickName>{commenterId}</NickName>
          <AddtionalWrapper>
            <Icon src={Siren} size={'12px'} />
            신고하기
          </AddtionalWrapper>
        </TitleWrapper>
      </CommentHeader>
      <CommentContent>
        <TextComment>{content}</TextComment>
        <LikeArea>
          <Icon src={Heart} size={'14px'} />
          <div>{likeCount}</div>
        </LikeArea>
      </CommentContent>
    </CommentCard>
  );
};

export default Comment;
