import React, { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useHelpModalStore } from '../../store/helpModalStore';
// Store for managing the heart guide modal state
import { create } from 'zustand';
import Logo from '../../images/character.png';
import { Icon } from '../../pages/HomePage.styles.ts';
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
  background-color: #2559f3;
  border-radius: 16px;
  position: relative;
  overflow-y: auto;
  max-height: 80vh;
  font-style: normal;
  padding: 0 20px 20px 20px;
  line-height: 1.5;
`;

const ModalHeader = styled.div`
  color: white;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  padding: 20px 20px 10px;
  line-height: 20px;
  letter-spacing: -0.03em;
  color: white;
  text-shadow:
    -1px -1px 0 black,
    1px -1px 0 black,
    -1px 1px 0 black,
    1px 1px 0 black;
`;

const ModalContent = styled.div`
  background: white;
  padding: 15px;
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 220px;
  justify-content: center;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  // text-align: center;
`;

const MethodsSection = styled.div`
  margin-bottom: 15px;
`;

const Method = styled.div`
  display: flex;
  align-items: center;
  // margin-bottom: 8px;
  font-size: 14px;
`;

const Bullet = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #000000;
  border-radius: 50%;
  margin-right: 10px;
  flex-shrink: 0;
`;

const FairyContainer = styled.div`
  position: absolute;
  right: 20px;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function HeartGuideModal() {
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
            <ModalHeader>칭찬요정 이용 안내</ModalHeader>
            <ModalContent>
              <Title>
                칭찬을 받고 싶다면
                <br />
                먼저 하트를 모아야 해요!
              </Title>
              <MethodsSection>
                <Method>하트를 얻는 방법은 다음 중 하나에요.</Method>
                <Method>
                  <Bullet />
                  댓글을 남기기
                </Method>
                <Method>
                  <Bullet />
                  다른 사람 댓글 추천하기
                </Method>
              </MethodsSection>
              <FairyContainer>
                <Icon
                  src={Logo}
                  alt="반응형 아이콘"
                  width="50px"
                  height="70px"
                  mobileWidth="50px"
                  mobileHeight="70px"
                />
              </FairyContainer>
            </ModalContent>
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  );
}
