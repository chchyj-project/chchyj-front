import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useHelpModalStore } from '../../store/helpModalStore';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 20px 0;
`;

const Modal = styled(motion.div)`
  width: 85%;
  max-width: 350px;
  background-color: white;
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow-y: auto;
  max-height: 80vh;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
`;

const Content = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

export default function HelpModal() {
  const { isOpen, closeHelpModal } = useHelpModalStore();
  const modalRef = useRef(null);

  // 모달이 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeHelpModal}
        >
          <Modal
            ref={modalRef}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={closeHelpModal}>✕</CloseButton>
            <Title>도움말</Title>
            <Content>
              <p>칭찬요정 서비스 이용 가이드입니다.</p>
              <p>1. 칭찬요정은 서로의 장점을 발견하고 칭찬하는 서비스입니다.</p>
              <p>2. 매일 새로운 칭찬을 받아보세요.</p>
              <p>3. 다른 사람에게 칭찬을 보내 기분 좋은 하루를 선물하세요.</p>
              <p>4. 부적절한 내용은 신고 기능을 이용해 알려주세요.</p>
            </Content>
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  );
}
