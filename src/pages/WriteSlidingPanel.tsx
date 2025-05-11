import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosInstance } from '../api/axiosConfig.ts';
import { useState } from 'react';
import { X } from 'lucide-react';
import { CloseButton } from '../style/commonStyle.ts';
import { useApiError } from '../hooks/useApiError.ts';
import { useArticleStore } from '../store/useArticleStore.ts'; // X 아이콘 추가
import { toast } from 'react-toastify';
import BtnText from '../images/buttonText2.png';
import styleToken from '../style/styleToken.ts';
import Icon1 from '../images/icon1.png';
import Icon2 from '../images/icon2.png';
import Icon3 from '../images/icon3.png';
import Icon4 from '../images/icon4.png';

const Button = styled.button`
  width: 100%;
  background: ${styleToken.color.primary};
  height: 56px;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;

const Panel = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: calc(50% - 180px); // Shifted slightly to the left
  transform: translateX(-25%);
  width: 100%;
  max-width: 390px;
  height: auto;
  background-color: white;
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  z-index: 201; // Overlay보다 높은 z-index

  // 모바일에서 높이 조정
  @media (max-width: 390px) {
    height: auto; // 모바일에서 더 적은 높이로 조정
    max-height: calc(100vh - 50px); // 최대 높이 제한 (상단 여백 확보)
  }
`;

const PanelContent = styled.div`
  margin: 0 auto;
  padding: 24px;
  height: 100%;
  position: relative;

  /* 모바일에서 상단 여백 더 확보 */
  @media (max-width: 480px) {
    padding: 24px;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  flex-grow: 1;
  margin: 24px 0;
  padding: 8px;
  border: 1px solid #6b90ff;
  border-radius: 12px;
  resize: none;
  font-size: 14px;
  color: #303030;
  height: 200px;
  outline: none;
  transition: 0.2s;
  &:focus {
    border: 1px solid #1a4de5;
  }
`;

const Wrapper = styled.div`
  color: #9e9e9e; /* 텍스트 색상 */
  font-size: 14px; /* 기본 폰트 크기 */
  line-height: 1.5; /* 텍스트 간격 */
  margin-bottom: 24px;
`;

const Item = styled.div`
  /* display: flex;
  align-items: center;
  gap: 10px; 아이콘과 텍스트 간격 */
`;

const Icon = styled.span`
  font-size: 18px; /* 아이콘 크기 */
`;

const Text = styled.span`
  display: inline-block;
  font-size: 13px;
  color: ${styleToken.color.secondary};
  margin-left: 8px;
`;

const Title = styled(Text)`
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 1.5;
  color: #303030;

  @media (max-width: 480px) {
    font-size: 18px;
    /* padding-right: 30px;
    margin-top: 12px; 모바일에서 상단 여백 증가 */
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 50%;
  right: 0;
  bottom: 0;
  width: 100%;
  background-color: #222; // 반투명 검정색 배경
  transform: translateX(-50%);
  z-index: 200; // Panel보다 낮은 z-index
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
  z-index: 202;

  @media (max-width: 480px) {
    top: 16px;
    right: 16px;
  }
`;

interface ArticleResponse {
  id: number;
  content: string;
  createdAt: string;
  // 기타 응답에서 받을 수 있는 필드들
}

export default function WriteSlidingPanel({
  isWriteMode,
  handleWriteClick,
}: any) {
  const [content, setContent] = useState('');
  const { handleApiError } = useApiError();
  const { fetchArticles, setSelectedArticleId } = useArticleStore();

  const save = async () => {
    try {
      const result = await axiosInstance.post<ArticleResponse>('/articles', {
        content,
      });

      if (result.status === 201 || result.status === 200) {
        // toast('게시글이 성공적으로 저장되었습니다.');
        setTimeout(() => {
          handleWriteClick(false);
          setContent('');
        }, 2000); // 2초 후 실행
        setSelectedArticleId(result.data.id);
        await fetchArticles();
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
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => handleWriteClick(false)}
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
                <Title>
                  청찬받고 싶은 내용을 입력하세요.
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
                    <img src={Icon4} alt="icon image" />
                    <Text>칭찬글 입력시 하트 1개가 차감됩니다.</Text>
                  </Item>
                  <Item>
                    <img src={Icon3} alt="icon image" />
                    <Text>
                      칭찬글은 입력 후 15분 이내에만 수정할 수 있습니다.
                    </Text>
                  </Item>
                  <Item>
                    <img src={Icon2} alt="icon image" />
                    <Text>
                      {' '}
                      칭찬글 삭제 15분 이후에는 하트는 반환되지 않습니다.
                    </Text>
                  </Item>
                  <Item>
                    <img src={Icon1} alt="icon image" />
                    <Text>욕설/비방 등은 동의없이 삭제될 수 있습니다.</Text>
                  </Item>
                </Wrapper>
                <Button onClick={save}>
                  <img src={BtnText} alt="Button text" />
                </Button>
              </PanelContent>
            </Panel>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
