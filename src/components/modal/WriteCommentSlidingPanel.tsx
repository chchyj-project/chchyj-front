import { AnimatePresence } from 'framer-motion';
import { axiosInstance } from '../../api/axiosConfig.ts';
import { useState } from 'react';
import { Heart, LockIcon, AlertTriangle, X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useApiError } from '../../hooks/useApiError.ts';
import {
  Panel,
  PanelContent,
  Title,
  StyledTextarea,
  Wrapper,
  Item,
  Button,
  Overlay,
  PanelCloseButton,
} from './WriteCommentSlidingPanel.styles.ts';

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

      if (result.status === 201 || result.status === 200) {
        // 성공적으로 저장됨
        console.log('댓글이 성공적으로 저장되었습니다:', result.data);
        handleWriteClick(false);
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
