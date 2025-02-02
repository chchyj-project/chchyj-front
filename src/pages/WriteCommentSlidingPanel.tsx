import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosInstance } from '../api/axiosConfig.ts';
import { useState } from 'react';
import { Heart, LockIcon, AlertTriangle, X } from 'lucide-react';
import ToastPopup from '../components/ToastPopup.tsx';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { CloseButton } from '../style/commonStyle.ts'; // X 아이콘 추가

const Panel = styled(motion.div)`
  position: fixed;
  bottom: 0;
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
`;

const PanelContent = styled.div`
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #000;
  margin-bottom: 24px;
  line-height: 1.4;
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
`;
const Icon = styled.span`
  font-size: 18px; /* 아이콘 크기 */
`;

const Text = styled.span`
  display: inline-block;
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

interface CommentResponse {
  id: number;
  // 기타 응답에서 받을 수 있는 필드들
}

export default function WriteCommentSlidingPanel({
  isWriteMode,
  handleWriteClick,
}: any) {
  const [toast, setToast] = useState<boolean>(false);
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState<string>('');
  const [content, setContent] = useState('');
  // const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

        // 예시: 토스트 메시지 표시
        setToast(true);
        setToastMsg('댓글이 성공적으로 저장되었습니다.');
        setTimeout(() => {
          handleWriteClick(false);
          setContent('');
        }, 2000); // 2초 후 실행
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
      setIsLoading(false);
    }
  };

  return (
    <>
      {toast && (
        <ToastPopup setToast={setToast} message={toastMsg} position="middle" />
      )}
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
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <PanelContent>
                <CloseButton onClick={() => handleWriteClick(false)}>
                  <X size={24} />
                </CloseButton>
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
