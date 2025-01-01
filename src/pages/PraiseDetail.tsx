import styled from 'styled-components';
import { ChevronLeft, MoreVertical } from 'lucide-react';

const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
  background: white;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 18px;
  margin-left: 8px;
`;

const PostContainer = styled.article`
  padding: 20px;
  border-bottom: 1px solid #eee;
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
  padding: 16px 0;
  border-bottom: 1px solid #eee;
  position: relative;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Nickname = styled.span`
  font-size: 14px;
  color: #333;
  margin-right: auto;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  font-size: 12px;
  color: #999;
`;

const CommentContent = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  margin-bottom: 8px;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 16px;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 12px;
  color: #999;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const BottomButton = styled.button`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #60c3fb;
  color: white;
  border: none;
  padding: 16px;
  font-size: 16px;
  cursor: pointer;
  max-width: 768px;
  margin: 0 auto;
`;

const MenuButton = styled.button`
  position: absolute;
  top: 16px;
  right: 0;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #999;
`;

export default function PraiseDetail() {
  return (
    <Container>
      <Header>
        <BackButton>
          <ChevronLeft size={24} />
        </BackButton>
        <Title>꽃네랑</Title>
      </Header>

      <PostContainer>
        <PostTitle>꽃네랑</PostTitle>
        <PostContent>
          오늘 피그마를 배웠어요. 프레임도 만들고 가이드도 만들고 넷 플릭스도
          만들고 토스도 만들고 이미지도 넣고, 많이 배웠어요. 이제 기본적인건 할
          수 있어요
        </PostContent>
        <PostDate>2023.5.20.</PostDate>
      </PostContainer>

      <CommentSection>
        {[1, 2, 3, 4].map((index) => (
          <CommentItem key={index}>
            <MenuButton>
              <MoreVertical size={16} />
            </MenuButton>
            <CommentHeader>
              <Nickname>닉넴</Nickname>
              <ActionButton>신고하기</ActionButton>
            </CommentHeader>
            <CommentContent>
              오늘 피그마를 배웠어요. 프레임도 만들고 가이드도 만들고 넷플릭스도
              만들고 토스도 만들고 이미지도 넣고, 많이 배웠어요. 이제 기본적인건
              할 수 있어요
            </CommentContent>
            <LikeButton>
              <span>♡</span>
            </LikeButton>
          </CommentItem>
        ))}
      </CommentSection>

      <BottomButton>칭찬 댓글 달기</BottomButton>
    </Container>
  );
}
