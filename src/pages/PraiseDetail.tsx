import styled from 'styled-components';
import { ChevronLeft, MoreVertical } from 'lucide-react';
import Common from '../style/Common.ts';
import styleToken from '../style/styleToken.ts';
import { useNavigate } from 'react-router-dom';
import { mockPost } from '../data/mockData/praiseDetail.ts';

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
  padding: 80px 16px 16px 16px;
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
  //display: flex;
  //align-items: center;
  margin-bottom: 8px;
`;

const Nickname = styled.span`
  font-size: 14px;
  color: #333;
  margin-right: auto;
  font-weight: bolder;
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

const BottomButtonWrapper = styled.div`
  position: fixed;
  bottom: 25px;
  z-index: 100;
  display: flex;
  justify-content: center;
  max-width: 784px;
  width: 100%;
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
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
  const navigate = useNavigate();
  const nickname = localStorage.getItem('nickname');
  const moveToListPage = () => {
    navigate('/home?userSocialId=' + nickname);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={moveToListPage}>
          <ChevronLeft size={24} />
        </BackButton>
        <Title>꽃네랑</Title>
      </Header>

      <PostContainer>
        <PostTitle>{mockPost.title}</PostTitle>
        <PostContent>{mockPost.content}</PostContent>
        <PostDate>{mockPost.createdAt}</PostDate>
      </PostContainer>

      <CommentSection>
        {mockPost.comments.map((comment) => (
          <CommentItem key={comment.id}>
            <MenuButton>
              <MoreVertical size={16} />
            </MenuButton>
            <CommentHeader>
              <Nickname>{comment.nickname}</Nickname>
              <ActionButton>신고하기</ActionButton>
            </CommentHeader>
            <CommentContent>{comment.content}</CommentContent>
            <LikeButton>
              <span>♡</span>
              {comment.likes > 0 && <span>{comment.likes}</span>}
            </LikeButton>
          </CommentItem>
        ))}
      </CommentSection>

      <BottomButtonWrapper>
        <BottomButton>칭찬 댓글 달기</BottomButton>
      </BottomButtonWrapper>
    </Container>
  );
}
