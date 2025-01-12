import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosInstance } from '../api/axiosConfig.ts';
import { useState } from 'react';
import { X } from 'lucide-react';
import ToastPopup from '../components/ToastPopup.tsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // X 아이콘 추가

const Button = styled.button`
  background-color: #60c3fb;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
`;

const Panel = styled(motion.div)`
  position: fixed;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  max-width: 768px;
  height: 90vh;
  background-color: white;
  border-radius: 30px 30px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  z-index: 11; // Overlay보다 높은 z-index
`;

const PanelContent = styled.div`
  //max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  flex-grow: 1;
  margin: 20px 0;
  padding: 25px 20px;
  border: 1px solid #60c3fb;
  border-radius: 4px;
  resize: none;
  font-size: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; /* 각 항목 간격 */
  color: #9e9e9e; /* 텍스트 색상 */
  font-size: 14px; /* 기본 폰트 크기 */
  line-height: 1.5; /* 텍스트 간격 */
  margin-bottom: 20px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 아이콘과 텍스트 간격 */
`;

const Icon = styled.span`
  font-size: 18px; /* 아이콘 크기 */
`;

const Text = styled.span`
  display: inline-block;
`;
const Title = styled(Text)`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #404040;
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
// const UnderlinedText = styled(Text)`
//   text-decoration: underline; /* 밑줄 적용 */
//   color: #5478f6; /* 밑줄 텍스트 색상 */
// `;
const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #404040;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 50%;
  }
`;

interface ArticleResponse {
  id: number;
  content: string;
  createdAt: string;
  // 기타 응답에서 받을 수 있는 필드들
}

const ToastWrapper = styled.div`
  position: absolute; // fixed 대신 absolute 사용
`;

export default function WriteSlidingPanel({
  isWriteMode,
  handleWriteClick,
}: any) {
  const [toast, setToast] = useState<boolean>('');
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState<string>('');
  const [content, setContent] = useState('');
  // const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const save = async () => {
    try {
      const result = await axiosInstance.post<ArticleResponse>('/articles', {
        content,
      });

      if (result.status === 201 || result.status === 200) {
        // 성공적으로 저장됨
        console.log('게시글이 성공적으로 저장되었습니다:', result.data);

        // 예시: 토스트 메시지 표시
        setToast(true);
        setToastMsg('게시글이 성공적으로 저장되었습니다.');

        // 예시: 목록 페이지로 이동
        navigate('/home?useSocialId=' + localStorage.getItem('userSocialId'));

        // 예시: 상태 초기화
        setContent('');
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
              setToastMsg('입력값이 올바르지 않습니다');
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
      {' '}
      {toast && (
        <ToastPopup setToast={setToast} message={toastMsg} position="bottom" />
      )}
      <AnimatePresence>
        {/* toast가 true일 때만 팝업이 노출됩니다.*/}

        {isWriteMode && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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
                <Title>
                  청찬받고 싶은 내용을 입력하세요 😉
                  <br />
                  칭찬요정들이 찾아올거에요~
                </Title>
                <StyledTextarea
                  placeholder="이러쿵저러쿵 이렇게 저렇게 글을 써봅니다. 어떻게 쓸까요?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <Wrapper>
                  <Item>
                    <Icon>❤️</Icon>
                    <Text>칭찬글 입력시 하트 1개가 차감됩니다.</Text>
                  </Item>
                  <Item>
                    <Icon>✏️</Icon>
                    <Text>
                      칭찬글은 입력 후 15분 이내에만 수정할 수 있습니다.
                    </Text>
                  </Item>
                  <Item>
                    <Icon>💟</Icon>
                    {/*<UnderlinedText>*/}
                    칭찬글 삭제 15분 이후에는 하트는 반환되지 않습니다.
                    {/*</UnderlinedText>*/}
                  </Item>
                  <Item>
                    <Icon>🚨</Icon>
                    <Text>욕설/비방 등은 동의없이 삭제될 수 있습니다.</Text>
                  </Item>
                </Wrapper>
                <Button onClick={save}>칭찬글 저장</Button>
              </PanelContent>
            </Panel>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
