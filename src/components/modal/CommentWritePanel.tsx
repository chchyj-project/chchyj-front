import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { axiosInstance } from '../../api/axiosConfig.ts';
import { toast } from 'react-toastify';
import heart from '../../images/heart.png';
import {
    Overlay,
    PanelWrapper,
    Panel,
    PanelContent,
    Title,
    StyledTextarea,
    ButtonContainer,
    Button,
    InfoText,
} from './CommentWritePanel.styles.ts';

interface CommentWritePanelProps {
    isOpen: boolean;
    onClose: () => void;
    articleId: string;
    onCommentAdded: () => void;
}

export default function CommentWritePanel({
    isOpen,
    onClose,
    articleId,
    onCommentAdded,
}: CommentWritePanelProps) {
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!content.trim()) {
            toast.warn('댓글 내용을 입력해주세요.');
            return;
        }

        setIsSubmitting(true);
        try {
            await axiosInstance.post('/replies', {
                articleId: articleId,
                content: content.trim(),
            });

            toast.success('댓글이 작성되었습니다!');
            setContent('');
            onCommentAdded();
            onClose();
        } catch (error) {
            console.error('댓글 작성 중 에러 발생:', error);
            toast.error('댓글 작성에 실패했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setContent('');
        onClose();
    };

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <>
                    <Overlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={handleClose}
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
                                    onClick={handleClose}
                                />

                                <Title>칭찬 댓글을 입력하세요!</Title>

                                <StyledTextarea
                                    placeholder="몸과 마음을 잘 챙긴 하루, 그 자체로 충분히 대단해요. 그런 것들이 모여서 자신을 더 사랑하는 오늘이 될 수 있어요."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    autoFocus
                                />

                                <InfoText>
                                    <img src={heart} alt="heart" style={{ width: '16px', height: '16px' }} />
                                    <span>칭찬댓글에 좋아요를 받으면 하트 1개가 지급됩니다.</span>
                                </InfoText>

                                <InfoText>
                                    <span>🔒</span>
                                    <span>좋아요를 받기 전까지 칭찬댓글은 글쓴이에게 노출되지 않습니다.</span>
                                </InfoText>

                                <InfoText>
                                    <span>🔔</span>
                                    <span>욕설/비방 등은 동의없이 삭제될 수 있습니다.</span>
                                </InfoText>

                                <ButtonContainer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        취소
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={handleSubmit}
                                        disabled={isSubmitting || !content.trim()}
                                    >
                                        {isSubmitting ? '작성 중...' : '댓글 작성'}
                                    </Button>
                                </ButtonContainer>
                            </PanelContent>
                        </Panel>
                    </PanelWrapper>
                </>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
}