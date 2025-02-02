import styled from 'styled-components';
import { ChevronLeft, Heart } from 'lucide-react';
import Common from '../style/Common.ts';
import styleToken from '../style/styleToken.ts';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArticleDetail } from '../types/PraiseItem.ts';
import { axiosInstance } from '../api/axiosConfig.ts';
import { useParams } from 'react-router-dom';
import { RowFlexBetween } from '../style/commonStyle.ts';
import CommentActions from '../components/CommentActions.tsx';
import dayjs from 'dayjs';
import WriteCommentSlidingPanel from './WriteCommentSlidingPanel.tsx';

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
  align-items: center; // 세로 중앙 정렬
  gap: 8px; // 요소들 사이의 간격
  margin-bottom: 8px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; // 세로 중앙 정렬
`;

const Nickname = styled.div`
  font-size: 14px;
  color: #333;
  font-weight: bolder;
  display: flex;
  align-items: center;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  font-size: 12px;
  color: #999;
  margin-right: auto; // 이 버튼 이후의 공간을 자동으로 채움
`;

const CommentContent = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  margin-bottom: 8px;
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

const LikeButton = styled.button`
  padding-right: 2px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function PraiseDetail() {
  const navigate = useNavigate();
  const nickname = localStorage.getItem('nickname');
  const { postId } = useParams();
  const [isWriteMode, setWriteMode] = useState(false);
  const [bgColor, setBgColor] = useState<string>('white');

  // PraiseDetail 컴포넌트 내부
  const [postDropdownOpen, setPostDropdownOpen] = useState(false);
  const [commentDropdowns, setCommentDropdowns] = useState<{
    [key: number]: boolean;
  }>({});

  // 댓글 드롭다운 토글 함수
  const toggleCommentDropdown = (commentId: number) => {
    setCommentDropdowns((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };
  const [articleDetail, setArticleDetail] = useState<ArticleDetail | null>(
    null,
  );
  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const { data } = await axiosInstance.get(`/articles/${postId}`);
        setArticleDetail(data);
      } catch (error) {
        console.error('상세 조회 중 에러 발생:', error);
      }
    };

    fetchArticleDetail();
  }, [postId, isWriteMode]);
  const handleWriteClick = async (isWriteMode: boolean) => {
    if (isWriteMode) {
      setBgColor('#4D4D4D');
    } else {
      setBgColor('white');
    }
    setWriteMode(isWriteMode);
  };

  const moveToListPage = () => {
    navigate('/home?userSocialId=' + nickname);
  };
  console.log('articleDetail', articleDetail);

  const like = () => {};
  return (
    <>
      <Container>
        <Header>
          <BackButton onClick={moveToListPage}>
            <ChevronLeft size={24} />
          </BackButton>
        </Header>

        <PostContainer>
          <PostHeader>
            <PostTitle>{articleDetail?.userName}</PostTitle>
            <CommentActions
              isopen={postDropdownOpen ? 'true' : 'false'}
              setIsOpen={setPostDropdownOpen}
              type="post" // 타입 구분을 위해 추가
            />{' '}
          </PostHeader>
          <PostContent>{articleDetail?.content}</PostContent>
          <PostDate>
            {dayjs(articleDetail?.createdAt).format('YYYY.MM.DD')}
          </PostDate>
        </PostContainer>

        <CommentSection>
          {articleDetail?.replyList.map((comment) => (
            <CommentItem key={comment.id}>
              <CommentHeader>
                <Nickname>{comment.userName}</Nickname>
                <ActionButton>신고하기</ActionButton>
                <PostDate>
                  {dayjs(comment.createdAt).format('YYYY.MM.DD')}
                </PostDate>

                <CommentActions
                  isopen={commentDropdowns[comment.id] ? 'true' : 'false'}
                  setIsOpen={() => toggleCommentDropdown(comment.id)}
                  type="comment" // 타입 구분을 위해 추가
                  commentId={comment.id}
                />
              </CommentHeader>
              <RowFlexBetween>
                <CommentContent>{comment.content}</CommentContent>
                <LikeButton onClick={like}>
                  <Heart
                    fill={comment.isLike ? '#87CEEB' : 'none'}
                    color="#87CEEB"
                    size={12}
                    className="cursor-pointer"
                  />
                </LikeButton>
              </RowFlexBetween>
            </CommentItem>
          ))}
        </CommentSection>

        {!isWriteMode && (
          <BottomButtonWrapper>
            <BottomButton onClick={() => handleWriteClick(true)}>
              칭찬 댓글 달기
            </BottomButton>
          </BottomButtonWrapper>
        )}
      </Container>
      {isWriteMode && (
        <WriteCommentSlidingPanel
          isWriteMode={isWriteMode}
          handleWriteClick={handleWriteClick}
        />
      )}
    </>
  );
}
