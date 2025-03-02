import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosInstance } from '../api/axiosConfig.ts';
import { useState } from 'react';
import { Heart, LockIcon, AlertTriangle, X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { CloseButton } from '../style/commonStyle.ts';
import { useApiError } from '../hooks/useApiError.ts';
import { toast } from 'react-toastify';

const Panel = styled(motion.div)`
  position: fixed;
  bottom: 0;
  //left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 768px;
  height: 50vh;
  background-color: white;
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  z-index: 11;
  border: 1px solid #e0e0e0;

  // 모바일에서는 더 높은 높이를 확보
  @media (max-width: 480px) {
    height: 60vh; // 모바일에서 더 높은 높이로 조정
    max-height: calc(100vh - 50px); // 최대 높이 제한 (상단 여백 확보)
  }
`;

const PanelContent = styled.div`
  padding: 24px;
  padding-bottom: 36px; /* 하단 버튼 여백 */
  padding-top: 32px; /* 상단 여백 증가 */
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  /* 모바일에서 상단 여백 더 확보 */
  @media (max-width: 480px) {
    padding-top: 40px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #000;
  margin-top: 10px; /* 상단 여백 추가 */
  margin-bottom: 24px;
  line-height: 1.4;
  padding-right: 40px;

  @media (max-width: 480px) {
    font-size: 20px;
    padding-right: 30px;
    margin-top: 12px; /* 모바일에서 상단 여백 증가 */
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  flex-grow: 1;
  margin: 0 0 24px 0;
  padding: 16px;
  border: none;
  border-radius: 12px;
  resize: none;
  font-size: 16px;
  background-color: #eef9ff;
  min-height: 100px;

  &::placeholder {
    color: #999;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
`;

const Button = styled.button`
  width: 100%;
  background-color: #60c3fb;
  border: none;
  color: white;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 12px; /* 모바일에서 하단 여백 */
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 50%;
  right: 0;
  bottom: 0;
  width: 768px;
  background-color: #4d4d4d; // 반투명 검정색 배경
  transform: translateX(-50%);
  z-index: 10; // Panel보다 낮은 z-index
`;

// 닫기 버튼 스타일링 개선
const PanelCloseButton = styled(CloseButton)`
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 2;
  background: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    top: 16px;
    right: 16px;
  }
`;

interface CommentResponse {
  id: number;
  // 기타 응답에서 받을 수 있는 필드들
}

export default function WriteCommentSlidingPanel({
  isWriteMode,
  handleWriteClick,
}: any) {
  const [content, setContent] = useState('');
  const { handleApiError } = useApiError();

  const { postId } = useParams();
  const save = async () => {
    try {
      console.log('content>>', content);
      const result = await axiosInstance.post<CommentResponse>('/replies', {
        content,
        articleId: Number(postId),
      });

      console.log('result-=-->', result);

      if (result.status === 201 || result.status === 200) {
        // 성공적으로 저장됨
        console.log('댓글이 성공적으로 저장되었습니다:', result.data);
        toast('댓글이 성공적으로 저장되었습니다.');
        setTimeout(() => {
          handleWriteClick(false);
          setContent('');
        }, 2000); // 2초 후 실행
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isWriteMode && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
            />
            <Panel
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 300,
                duration: 0.4,
              }}
            >
              <PanelContent>
                <PanelCloseButton onClick={() => handleWriteClick(false)}>
                  <X size={20} />
                </PanelCloseButton>
                <Title>꽃내랑님의 칭찬요정이 되어주세요! 🥰</Title>
                <StyledTextarea
                  placeholder="칭찬 댓글을 입력해주세요..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <Wrapper>
                  <Item>
                    <Heart size={16} color="#666" />
                    칭찬댓글에 좋아요를 받으면 하트 1개가 지급됩니다.
                  </Item>
                  <Item>
                    <LockIcon size={16} color="#666" />
                    좋아요를 받기 전까지 칭찬댓글은 글쓴이에게 노출되지
                    않습니다.
                  </Item>
                  <Item>
                    <AlertTriangle size={16} color="#666" />
                    욕설/비방 등은 동의없이 삭제될 수 있습니다.
                  </Item>
                </Wrapper>
                <Button onClick={save}>칭찬 댓글 저장</Button>
              </PanelContent>
            </Panel>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
