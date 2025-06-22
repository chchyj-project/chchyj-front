import { AnimatePresence } from 'framer-motion';
import { axiosInstance } from '../../api/axiosConfig.ts';
import { useState } from 'react';
import { useApiError } from '../../hooks/useApiError.ts';
import { useArticleStore } from '../../store/useArticleStore.ts';
import { createPortal } from 'react-dom';
import BtnText from '../../images/buttonText2.png';
import Icon1 from '../../images/icon1.png';
import Icon2 from '../../images/icon2.png';
import Icon3 from '../../images/icon3.png';
import Icon4 from '../../images/icon4.png';
import BtnCharacter from '../../images/complimentFairy.png';
import {
  Button,
  Panel,
  PanelWrapper,
  PanelContent,
  StyledTextarea,
  Wrapper,
  Item,
  Text,
  Title,
  Overlay,
  PanelCloseButton,
} from './WriteSlidingPanel.styles.ts';

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
  console.log('isWriteMode', isWriteMode);
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
  console.log('[writesling pannel] isWriteMode', isWriteMode);
  
  // Portal을 사용해서 body에 직접 렌더링
  const modalContent = (
    <AnimatePresence>
      {isWriteMode && (
        <>
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleWriteClick(false)}
          />
          <PanelWrapper
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 200,
              duration: 0.5,
            }}
          >
            <Panel>
            <PanelContent>
              {/* 상단 핸들 바 */}
              <div 
                style={{
                  width: '40px',
                  height: '4px',
                  backgroundColor: '#E0E0E0',
                  borderRadius: '2px',
                  margin: '12px auto 20px',
                  cursor: 'pointer'
                }}
                onClick={() => handleWriteClick(false)}
              />
              <Title>
                칭찬받고 싶은 내용을 입력하세요.
                <br />
                칭찬요정들이 찾아올거에요~
              </Title>
                              <StyledTextarea
                  placeholder={`오늘은 딱히 대단한 일은 없었지만,
하루 세 끼 챙겨 먹고 물도 열심히 마셨어요.
내 몸을 잘 돌봐준 내가 조금 대견했어요.`}
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
                    칭찬글 삭제 15분 이후에는 하트는 반환되지 않습니다.
                  </Text>
                </Item>
                <Item>
                  <img src={Icon1} alt="icon image" />
                  <Text>욕설/비방 등은 동의없이 삭제될 수 있습니다.</Text>
                  </Item>
              </Wrapper>
                <Button onClick={save}>
                  칭찬 받을래요
                  <img src={BtnCharacter} alt="Button character" />
                </Button>
            </PanelContent>
            </Panel>
          </PanelWrapper>
        </>
      )}
    </AnimatePresence>
  );

  // Portal을 사용해서 body에 렌더링
  return createPortal(modalContent, document.body);
}
