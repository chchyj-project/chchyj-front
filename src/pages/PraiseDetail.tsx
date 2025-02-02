import styled from 'styled-components';
import { ChevronLeft, Heart } from 'lucide-react';
import Common from '../style/Common.ts';
import styleToken from '../style/styleToken.ts';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArticleDetail } from '../types/PraiseItem.ts';
import { axiosInstance } from '../api/axiosConfig.ts';
import { useParams } from 'react-router-dom';
import { RowFlexBetween } from '../style/commonStyle.ts';
import CommentActions from '../components/CommentActions.tsx';
import dayjs from 'dayjs';
import WriteCommentSlidingPanel from './WriteCommentSlidingPanel.tsx';
import Siren from '../images/siren.png';
import { Icon } from '../style/MainPage.ts';
import ToastPopup from '../components/ToastPopup.tsx';

interface UpdateArticleResponse {
  content: string;
}

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
  //padding: 4px;
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

// 수정할 수 있는 TextArea 컴포넌트 추가
const EditableTextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  margin-bottom: 12px;
`;

const EditButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const EditButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &.cancel {
    background-color: #f5f5f5;
    color: #666;
  }

  &.save {
    background-color: ${Common.colors.skyblue};
    color: white;
  }
`;

export default function PraiseDetail() {
  const navigate = useNavigate();
  const nickname = localStorage.getItem('nickname');
  const { postId } = useParams();
  const [isWriteMode, setWriteMode] = useState(false);
  const [bgColor, setBgColor] = useState<string>('white');
  const location = useLocation();
  const [postDropdownOpen, setPostDropdownOpen] = useState(false);
  const [commentDropdowns, setCommentDropdowns] = useState<{
    [key: number]: boolean;
  }>({});
  const [toastMsg, setToastMsg] = useState<string>('');
  const [toast, setToast] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');

  // 수정 모드 진입 시 현재 내용을 state에 설정
  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(articleDetail?.content || '');
    setPostDropdownOpen(true);
  };

  // 수정 완료 처리
  const handleEditSubmit = async () => {
    if (postId && postDropdownOpen) {
      try {
        const result = await updateArticle(Number(postId), editContent);

        if (result.success) {
          setToastMsg('게시글이 성공적으로 수정되었습니다.');
          setToast(true);
          setIsEditing(false);
          await fetchArticleDetail(); // 수정된 내용 다시 불러오기
        }
      } catch (error: any) {
        setToastMsg('게시글 수정에 실패했습니다.');
        setToast(true);
      }
    }
  };

  useEffect(() => {
    setPostDropdownOpen(true);
  }, []);

  const { mode } = location.state || '';
  // PraiseDetail 컴포넌트 내부

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
  const fetchArticleDetail = async () => {
    try {
      const { data } = await axiosInstance.get(`/articles/${postId}`);
      setArticleDetail(data);
    } catch (error) {
      console.error('상세 조회 중 에러 발생:', error);
    }
  };
  useEffect(() => {
    fetchArticleDetail();
  }, [postId, isWriteMode]);

  useEffect(() => {
    if (mode === 'commentOpen') {
      handleWriteClick(true);
    }
  }, [mode]);

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

  const handleDelete = async (replyId: number) => {
    // 삭제 로직
    if (postDropdownOpen) {
      // 칭찬 게시글 삭제
      try {
        const isDeleted = await deleteReply(replyId);
        if (isDeleted) {
          // 성공 처리 (예: 토스트 메시지 표시)
          setToast(true);

          setToastMsg('댓글이 삭제되었습니다.');
          // 목록 다시 불러오기 등
          await fetchArticleDetail();
        }
      } catch (error) {
        // 에러 처리
        setToast(true);

        setToastMsg('댓글 삭제에 실패했습니다.');
      }
      console.log('칭찬 게시글 삭제');
    } else {
      //댓글 삭제
    }
    // setIsOpen(false);
  };

  const deleteReply = async (replyId: number) => {
    try {
      const response = await axiosInstance.delete(`/replies/${replyId}`);

      if (response.status === 200 || response.status === 204) {
        return true; // 삭제 성공
      }
      return false;
    } catch (error) {
      console.error('댓글 삭제 중 에러 발생:', error);
      throw error;
    }
  };

  const updateArticle = async (articleId: number, content: string) => {
    try {
      const response = await axiosInstance.put<UpdateArticleResponse>(
        `/articles/${articleId}`,
        { content },
      );

      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      }
      return {
        success: false,
        error: '게시글 수정에 실패했습니다.',
      };
    } catch (error) {
      console.error('게시글 수정 중 에러 발생:', error);
      throw error;
    }
  };

  const like = () => {};
  return (
    <>
      {toast && (
        <ToastPopup setToast={setToast} message={toastMsg} position="bottom" />
      )}
      <Container>
        <Header>
          <BackButton onClick={moveToListPage}>
            <ChevronLeft size={24} />
          </BackButton>
        </Header>

        <PostContainer>
          <PostHeader>
            <PostTitle>{articleDetail?.userName}</PostTitle>
            {!isEditing && (
              <CommentActions
                isopen={postDropdownOpen ? 'false' : 'true'}
                setIsOpen={setPostDropdownOpen}
                type="post"
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </PostHeader>
          {isEditing ? (
            <>
              <EditableTextArea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <EditButtons>
                <EditButton
                  className="cancel"
                  onClick={() => setIsEditing(false)}
                >
                  취소
                </EditButton>
                <EditButton className="save" onClick={handleEditSubmit}>
                  수정완료
                </EditButton>
              </EditButtons>
            </>
          ) : (
            <>
              <PostContent>{articleDetail?.content}</PostContent>
              <PostDate>
                {dayjs(articleDetail?.createdAt).format('YYYY.MM.DD')}
              </PostDate>
            </>
          )}
        </PostContainer>

        <CommentSection>
          {articleDetail?.replyList.map((comment) => (
            <CommentItem key={comment.id}>
              <CommentHeader>
                <Nickname>{comment.userName}</Nickname>
                <Icon src={Siren} size={'12px'} />
                <ActionButton>신고하기</ActionButton>

                <CommentActions
                  isopen={commentDropdowns[comment.id] ? 'true' : 'false'}
                  setIsOpen={() => toggleCommentDropdown(comment.id)}
                  type="comment" // 타입 구분을 위해 추가
                  commentId={comment.id}
                  handleDelete={handleDelete}
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
              <PostDate>
                {dayjs(comment.createdAt).format('YYYY.MM.DD')}
              </PostDate>
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
